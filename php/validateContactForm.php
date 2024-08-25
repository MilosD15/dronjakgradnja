<?php

require_once("./loadLanguage.php");
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

session_start();

handleContactFormSubmission();

function handleContactFormSubmission() {
  global $alert_messages;

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['token']) && isset($_SESSION['token']) && $_POST['token'] === $_SESSION['token']) {
      $email = sanitizeInput($_POST['email']);
      $subject = sanitizeInput($_POST['subject']);
      $message = sanitizeInput($_POST['message']);
      $lang = sanitizeInput($_POST['lang']);
  
      $result = validateContactForm($email, $message, $lang);
  
      $_SESSION['contactFormResponse'] = $result;
      $_SESSION['contactFormData'] = [
        "email" => $email,
        "subject" => $subject,
        "message" => $message,
      ];
      if ($result["result"] === "success") {
        if (sendEmailToUs($email, $subject, $message) && sendAutomatedEmailToCustomer($email, $lang)) {
          unset($_SESSION['contactFormData']);
        } else {
          $_SESSION['contactFormResponse'] = [
            "result" => "error",
            "message" => $alert_messages["errors"]["emailNotSent"][$lang]
          ];
        }
      }
    }

    $requestURI = $lang == "nl" ? "/" : "/$lang";
    header("Location: $requestURI");
    return;
  }

  header("Location: /");
}

function sendAutomatedEmailToCustomer($email, $lang) {
  global $automatedEmail;
  $adminEmail = $_SERVER['ADMIN_EMAIL_ADDRESS'];
  $actualText = $automatedEmail["body"][$lang];
  $message = "
  <div style=\"font-family: Tahoma, Geneva, sans-serif; letter-spacing: 0.5px; line-height: 1.3; padding: 15px; background-color: #ffffff; color: #000000; padding-bottom: 0;\">
    $actualText
  </div>
  ";
  $signature = "
  <div style=\"display: flex; align-items: center; height: 140px; padding: 10px; font-family: Tahoma, Geneva, sans-serif; background-color: #ffffff; color: #000000; padding-bottom: 20px; padding-top: 20px;\">
    <img 
      src=\"https://ndbinnenrenovaties.nl/logo_200x200.png\" 
      alt=\"ND Binnen Renovaties Logo\"
      style=\"width: 100px; height: 100px; border: 2px solid #000000; border-radius: 9999px;\"
    >
    <div style=\"margin-left: 20px; padding-top: 15px;\">
      <h1 style=\"font-size: 1.6rem; font-weight: 400; margin: 0; margin-bottom: 2px; color: #000000;\">Nenad</h1>
      <p style=\"font-size: 1rem; margin: 0; font-style: italic; color: #000000;\">Owner</p>
    </div>
  </div>
  ";
  $subject = $automatedEmail["subject"][$lang];
  $body = $message . $signature;

  return sendEmail($adminEmail, $adminEmail, $email, $subject, $body);
}

function sendEmailToUs($email, $subject, $message) {
  $adminEmail = $_SERVER['ADMIN_EMAIL_ADDRESS'];
  $body = "Query from: $email <br><br> Subject -> $subject <br><br> Message -> $message";

  return sendEmail($adminEmail, $email, $adminEmail, $subject, $body);
}

function sendEmail($from, $replyTo, $recipient, $subject, $body) {
  $mail = new PHPMailer;

  try {
    // Server settings
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Host = $_SERVER['HOST']; // Set the SMTP server to send through
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = $_SERVER['ADMIN_EMAIL_ADDRESS']; // SMTP username
    $mail->Password = $_SERVER['ADMIN_EMAIL_PASSWORD']; // SMTP password
    $mail->SMTPSecure = "ssl"; // Enable SSL encryption
    $mail->Port = 465; // TCP port to connect to

    // Recipients
    $mail->setFrom($from, "ND Binnen Renovaties");
    $mail->addReplyTo($replyTo);
    $mail->addAddress($recipient); // Add a recipient

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->send();
    return true;
  } catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    return false;
  }
}

function validateContactForm($email, $message, $lang) {
  global $alert_messages;

  if (empty($message) || empty($email)) {
    return [
      "result" => "error",
      "message" => $alert_messages["errors"]["emptyField"][$lang]
    ];
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    return [
      "result" => "error",
      "message" => $alert_messages["errors"]["invalidEmail"][$lang]
    ];
  }

  return [
    "result" => "success",
    "message" => $alert_messages["successMessage"][$lang]
  ];
}

function sanitizeInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

echo "Processing...";