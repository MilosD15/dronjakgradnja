<?php

require_once("./php/loadLanguage.php");

session_start();

// implement changing language and different languages (NEEDS TO BE DONE WHEN THE DOMAIN IS BOUGHT)
$langScript = null;
// Extract the language code from the URL path
$urlPath = trim($_SERVER['REQUEST_URI'], '/');
$languageCode = substr($urlPath, 0, 2);

// Determine the language and render the translation
if (isset($LANGUAGE_TRANSCRIPTS[$languageCode])) {
    $langScript = $LANGUAGE_TRANSCRIPTS[$languageCode];
} else {
    $langScript = $LANGUAGE_TRANSCRIPTS["nl"];
}

// setting up a security token for contact form
$token = bin2hex(random_bytes(32));
$_SESSION['token'] = $token;

// handle contact form response
$contactFormResponse = null;
if (isset($_SESSION['contactFormResponse'])) {
    $contactFormResponse = $_SESSION['contactFormResponse'];
    unset($_SESSION['contactFormResponse']);
}
$contactFormData = null;
if (isset($_SESSION['contactFormData'])) {
    $contactFormData = $_SESSION['contactFormData'];
    unset($_SESSION['contactFormData']);
}

// resources
$resources = [
    "https://www.pngitem.com/middle/obTxRT_electric-shock-png-real-life-example-of-a/",
    "https://www.onlinewebfonts.com/icon/526362",
    "https://www.pngitem.com/middle/hwwJThR_check-green-check-list-icon-hd-png-download/",
    "https://lexannmedia.com/contact/",
];

?>

<!DOCTYPE html>
<html lang="<?php echo $langScript["lang"]; ?>">
<head>
    <meta charset="UTF-8">
    <meta 
        name="keywords" 
        content="<?php echo $langScript["meta"]["keywords"]; ?>"
    >
    <meta 
        name="description" 
        content="<?php echo $langScript["meta"]["description"]; ?>"
    >
    <meta 
        name="author" 
        content="<?php echo $langScript["meta"]["author"]; ?>"
    >
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="./images/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="./font/rosario/addRosario.css">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/responsive-wrapper.css">
    <link rel="stylesheet" href="./styles/header.css">
    <link rel="stylesheet" href="./styles/start-section.css">
    <link rel="stylesheet" href="./styles/latest-work.css">
    <link rel="stylesheet" href="./styles/about-section.css">
    <link rel="stylesheet" href="./styles/services.css">
    <link rel="stylesheet" href="./styles/why-section.css">
    <link rel="stylesheet" href="./styles/contact-section.css">
    <link rel="stylesheet" href="./styles/footer.css">
    <?php 
        if ($langScript["lang"] == "sr") {
            echo "<link rel=\"stylesheet\" href=\"./styles/sr-styles.css\">";
        }
    ?>
    <?php 
        if ($langScript["lang"] == "nl") {
            echo "<link rel=\"stylesheet\" href=\"./styles/nl-styles.css\">";
        }
    ?>
    <title><?php echo $langScript["title"]; ?></title>
    <style>
        html {
            overflow-y: hidden;
        }
        #loader {
            opacity: 1;
            pointer-events: all;
            min-width: 100%;
            min-height: 100vh;
            background-color: white;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            transition: opacity 0.6s ease;
        }
        #loader .image {
            position: relative;
            width: 190px;
            height: 190px;
            border-radius: 50%;
            padding: 1em;
            background-color: white;
        }
        #loader .image img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        #loader .image .circle {
            position: absolute;
            top: -5%;
            left: -5%;
            width: 110%;
            height: 110%;
            border: 4px solid transparent;
            border-radius: 50%;
        }
        #loader .image .red {
            border-top-color: #f8341e;
            animation: rotate 1s ease-in-out infinite;
        }
        #loader .image .yellow {
            border-top-color: #f7f21c;
            animation: rotate 1.5s ease-in infinite;
        }
        #loader .image .black {
            border-top-color: rgb(58, 58, 58);
            animation: rotate 2s ease-out infinite;
        }
        @keyframes rotate {
            from { transform: rotate(0); }
            to { transform: rotate(360deg); }
        }
        @media screen and (max-width: 750px) {
            #loader .image {
                width: 160px;
                height: 160px;
            }
        }
        @media screen and (max-width: 500px) {
            #loader .image {
                width: 120px;
                height: 120px;
            }
        }
    </style>
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1NE7GSG9WX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-1NE7GSG9WX');
    </script>
    
    <script src="./js/draggableSlider.js" defer></script>
    <script src="./js/enlargeImages.js" defer></script>
    <script src="./js/functions.js" defer></script>
    <script src="./js/Observers.js" defer></script>
    <script src="./js/main.js" defer></script>
    <script src="./js/latestWork.js" type="module"></script>
</head>
<body>
    <div id="loader">
        <div class="image">
            <img src="./images/logo-loader.jpg" alt="ND Binnen Renovaties Logo">
            <div class="circle black"></div>
            <div class="circle yellow"></div>
            <div class="circle red"></div>
            <div class="circle black"></div>
        </div>
    </div>
    <div class="langWrapper">
        <h1><?php echo $langScript["langPanel"]["title"]; ?></h1>
        <div class="conForItems">
            <a href="/en" class="item en">
                <img src="./images/english-flag.jpg" 
                alt="<?php echo $langScript["langPanel"]["en"]["imgAlt"]; ?>">
                <div class="label">
                    <?php echo $langScript["langPanel"]["en"]["label"]; ?>
                </div>
            </a>
            <a href="/" class="item nl">
                <img src="./images/netherlands-flag.jpg" 
                alt="<?php echo $langScript["langPanel"]["nl"]["imgAlt"]; ?>">
                <div class="label">
                    <?php echo $langScript["langPanel"]["nl"]["label"]; ?>
                </div>
            </a>
            <a href="/sr" class="item sr">
                <img src="./images/serbian-flag.jpg" 
                alt="<?php echo $langScript["langPanel"]["sr"]["imgAlt"]; ?>">
                <div class="label">
                    <?php echo $langScript["langPanel"]["sr"]["label"]; ?>
                </div>
            </a>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="fas fa-times" width="64" height="64" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    </div>
    <!-- res wrapper -->
    <?php 
        if (count($resources) > 0) {
            echo "<div class=\"ResWrapper\"><div class=\"con\"><h1>";
            echo $langScript["resourcesPanel"]["title"];
            echo "</h1><p>";
            echo $langScript["resourcesPanel"]["paragraph"];
            echo "</p><div class=\"label\" data-visibility=\"visible\">";
            echo $langScript["resourcesPanel"]["seeResourcesBtn"];
            echo "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"\" width=\"64\" height=\"64\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#000000\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M6 9l6 6l6 -6\" /></svg></div><div class=\"links\">";
            foreach ($resources as $resource) {
                echo "<a href=\"";
                echo $resource;
                echo "\" target=\"_blank\">";
                echo $resource;
                echo "</a>";
            }
            echo "</div>";
            echo "<button>";
            echo $langScript["resourcesPanel"]["okBtn"];
            echo "</button></div></div>";
        } 
    ?>
    <div class="fullAlertContainer">
        <div class="alert">
            <div class="message"></div>
            <div class="btn"><button>OK</button></div>
        </div>
    </div>
    <div class="largeImage">
        <svg xmlns="http://www.w3.org/2000/svg" class="fas fa-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" title="<?php echo $langScript["enlargeImagePanel"]["previousBtn"]; ?>" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 6l-6 6l6 6" />
        </svg>
        <div class="image">
            <img src="" 
            alt="<?php echo $langScript["enlargeImagePanel"]["imageAlt"]; ?>" 
            title="<?php echo $langScript["enlargeImagePanel"]["imageTitle"]; ?>">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="fas fa-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" title="<?php echo $langScript["enlargeImagePanel"]["nextBtn"]; ?>" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 6l6 6l-6 6" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="fas fa-times" width="64" height="64" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" title="<?php echo $langScript["enlargeImagePanel"]["closeBtn"]; ?>" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    </div>
    <header>
        <div class="responsive-wrapper inline-flex">
            <div class="con-logo">
                <a href="#beginning" data-name="ND Binnen Renovaties">
                    <img src="./images/logo.jpg" alt="ND Binnen Renovaties Logo">
                </a>
            </div>
            <nav>
                <a href="#beginning">
                    <?php echo $langScript["header"]["navigation"]["home"]; ?>
                </a>
                <div class="wrapper">
                    <a href="#work">
                        <?php echo $langScript["header"]["navigation"]["services"]; ?>
                    </a> <!-- this link has a fake href (#work) that goes nowhere, just for preventing scrolling page when user click on it -->
                    <div class="triangle"></div>
                    <div class="dropdown">
                        <a href="#PW"><div class="txt">
                            <?php echo $langScript["header"]["navigation"]["paintingWorks"]; ?>
                        </div></a>
                        <a href="#EW"><div class="txt">
                            <?php echo $langScript["header"]["navigation"]["electricianWorks"]; ?>
                        </div></a>
                        <a href="#GW"><div class="txt">
                            <?php echo $langScript["header"]["navigation"]["plasterWorks"]; ?>
                        </div></a>
                        <a href="#AW"><div class="txt">
                            <?php echo $langScript["header"]["navigation"]["additionalWorks"]; ?>
                        </div></a>
                    </div>
                </div>
                <a href="#why_sec">
                    <?php echo $langScript["header"]["navigation"]["whyUs"]; ?>
                </a>
                <a href="#about">
                    <?php echo $langScript["header"]["navigation"]["about"]; ?>
                </a>
                <a href="#contact">
                    <?php echo $langScript["header"]["navigation"]["contact"]; ?>
                </a>
                <div class="lang-btn large-s" 
                data-name="<?php echo $langScript["header"]["navigation"]["languageBtn"]; ?>">
                    <svg width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 5h7" />
                        <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
                        <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
                        <path d="M12 20l4 -9l4 9" />
                        <path d="M19.1 18h-6.2" />
                    </svg>
                </div>
            </nav>
            <div class="side">
                <a href="#stay" class="btn">
                    <div class="line top"></div>
                    <div class="line middle"></div>
                    <div class="line bottom"></div>
                </a>
                <aside>
                    <a href="#beginning">
                        <?php echo $langScript["header"]["navigation"]["home"]; ?>
                    </a>
                    <div class="wrapper">
                        <a href="#work">
                            <?php echo $langScript["header"]["navigation"]["services"]; ?>
                        </a><!-- this link has a fake href (#work) that goes nowhere, just for preventing scrolling page when user click on it -->
                        <div class="triangle"></div>
                        <div class="dropdown">
                            <a href="#PW">
                                <?php echo $langScript["header"]["navigation"]["paintingWorks"]; ?>
                            </a>
                            <a href="#EW">
                                <?php echo $langScript["header"]["navigation"]["electricianWorks"]; ?>
                            </a>
                            <a href="#GW">
                                <?php echo $langScript["header"]["navigation"]["plasterWorks"]; ?>
                            </a>
                            <a href="#AW">
                                <?php echo $langScript["header"]["navigation"]["additionalWorks"]; ?>
                            </a>
                        </div>
                    </div>
                    <a href="#why_sec">
                        <?php echo $langScript["header"]["navigation"]["whyUs"]; ?>
                    </a>
                    <a href="#about">
                        <?php echo $langScript["header"]["navigation"]["about"]; ?>
                    </a>
                    <a href="#contact">
                        <?php echo $langScript["header"]["navigation"]["contact"]; ?>
                    </a>
                </aside>
                <div class="lang-btn small-s" 
                data-name="<?php echo $langScript["header"]["navigation"]["languageBtn"]; ?>">
                    <svg width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 5h7" />
                        <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
                        <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
                        <path d="M12 20l4 -9l4 9" />
                        <path d="M19.1 18h-6.2" />
                    </svg>
                </div>
            </div>
        </div>
    </header>
    <main>
        <section class="start" id="beginning">
            <div class="responsive-wrapper">
                <div class="intro-message">
                    <div>
                        <?php echo $langScript["hero"]["introMessage"]["sentence-1"]; ?>
                    </div>
                    <div>
                    <?php echo $langScript["hero"]["introMessage"]["sentence-2"]; ?>
                    </div>
                </div>
                <div class="slider">
                    <div class="makeBig" 
                    data-name="<?php echo $langScript["sliderEnlargePicture"]["hoverText"]; ?>">
                        <img src="./images/bigger.png" 
                        alt="<?php echo $langScript["sliderEnlargePicture"]["iconAlt"]; ?>">
                    </div>
                    <div class="left btn left-btn disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 6l-6 6l6 6" />
                        </svg>
                        <div class="half-circle left"></div>
                    </div>
                    <div class="content">
                        <img src="./images/slider-image-1.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no1">
                        <img src="./images/slider-image-2.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>"  id="no2">
                        <img src="./images/slider-image-3.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no3">
                        <img src="./images/slider-image-4.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no4">
                        <img src="./images/slider-image-5.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no5">
                        <img src="./images/slider-image-6.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no6">
                        <img src="./images/slider-image-7.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no7">
                        <img src="./images/slider-image-8.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no8">
                        <img src="./images/slider-image-9.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no9">
                        <img src="./images/slider-image-10.jpg" 
                        alt="<?php echo $langScript["hero"]["sliderImgAlt"]; ?>" id="no10">
                    </div>
                    <div class="right btn right-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 6l6 6l-6 6" />
                        </svg>
                        <div class="half-circle right"></div>
                    </div>
                </div>
                <a href="#projects" class="button see-projects">
                    <p><?php echo $langScript["hero"]["callToActionLink"]["text"]; ?></p>
                </a>
            </div>
        </section>
        <section class="latest-work" id="projects" data-latest-work>
            <div class="responsive-wrapper latest-projects">
                <h1 class="latest-work__title" data-latest-work-title><?php echo $langScript["latest-work"]["title"]; ?></h1>
                <p class="latest-work__paragraph" data-latest-work-paragraph><?php echo $langScript["latest-work"]["paragraphText"]; ?></p>
                <div class="latest-work__grid" data-latest-work-grid>
                    <div 
                        class="latest-work__grid-column" 
                        data-latest-work-grid-column 
                        data-latest-work-grid-column-flag="installations"
                    ></div>
                    <div 
                        class="latest-work__grid-column" 
                        data-latest-work-grid-column 
                        data-latest-work-grid-column-flag="interior-works"
                    ></div>
                    <div 
                        class="latest-work__grid-column" 
                        data-latest-work-grid-column 
                        data-latest-work-grid-column-flag="ceramic-works"
                    ></div>
                    <div 
                        class="latest-work__grid-column" 
                        data-latest-work-grid-column 
                        data-latest-work-grid-column-flag="other-works"
                    ></div>
                </div>
            </div>

            <dialog class="latest-work__read-more-popup" data-latest-work-read-more-popup>
                <dialog 
                    class="latest-work__read-more-popup-enlarge-large-picture-dialog" 
                    data-latest-work-read-more-popup-enlarge-large-picture
                >
                    <button 
                    class="latest-work__read-more-popup-enlarge-large-picture-close-btn" 
                    data-latest-work-read-more-popup-enlarge-large-picture-close-btn
                    >
                        <svg class="latest-work__read-more-popup-close-btn-svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src="./images/works/work-17/showcase.jpg" 
                        alt="" 
                        class="latest-work__read-more-popup-enlarge-large-picture-img" 
                        data-latest-work-read-more-popup-enlarge-large-picture-img
                    >
                </dialog>
                <div class="latest-work__read-more-popup-header">
                    <h1 class="latest-work__read-more-popup-title" data-latest-work-read-more-popup-title></h1>
                    <button class="latest-work__read-more-popup-close-btn" data-latest-work-read-more-popup-close-btn>
                        <svg class="latest-work__read-more-popup-close-btn-svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="latest-work__read-more-popup-category">
                    <strong>
                    <?php echo $langScript["latest-work"]["categoryText"]; ?>: 
                        <i><span data-latest-work-read-more-popup-category></span></i>
                    </strong>
                </div>
                <div class="latest-work__read-more-popup-description">
                    <p data-latest-work-read-more-popup-description></p>
                </div>
                <p class="latest-work__read-more-popup-images-additional-notice" data-latest-work-read-more-popup-notice-above-image>
                    <?php echo $langScript["latest-work"]["noticeAboveImage"][0]; ?> 
                    <br> 
                    <?php echo $langScript["latest-work"]["noticeAboveImage"][1]; ?>
                </p>
                <div 
                    class="latest-work__read-more-popup-large-img-container"
                    data-latest-work-read-more-popup-large-img-container
                >
                    <img 
                        src="" data-src="./images/works/work-17/showcase.jpg" 
                        class="latest-work__read-more-popup-large-img"
                        alt="" 
                        data-latest-work-read-more-popup-img 
                        data-latest-work-read-more-popup-large-img
                    >
                    <div 
                        class="latest-work__read-more-popup-large-img-blurred-container" 
                    >
                    <img 
                        src="./images/works/work-17/showcase-small.jpg" 
                        class="latest-work__read-more-popup-large-img-blurred" 
                        alt=""
                        data-latest-work-read-more-popup-large-blurred-img
                    >
                    </div>
                </div>
                <p class="latest-work__read-more-popup-images-additional-text">
                    <?php echo $langScript["latest-work"]["additionalImagesText"]; ?>
                </p>
                <div 
                    class="latest-work__read-more-popup-additional-images-grid"
                    data-latest-work-read-more-popup-additional-images-grid
                ></div>
            </dialog>

            <template data-latest-work-read-more-popup-additional-img-template>
                <div 
                    class="latest-work__read-more-popup-additional-images-grid-item"
                    data-latest-work-read-more-popup-additional-images-grid-item
                    >
                    <img 
                        src="" data-src="" 
                        class="latest-work__read-more-popup-additional-img"
                        alt="" 
                        data-latest-work-read-more-popup-img
                        data-latest-work-read-more-popup-additional-img
                    >
                    <div 
                        class="latest-work__read-more-popup-additional-img-blurred-container" 
                    >
                        <img 
                            src="" 
                            class="latest-work__read-more-popup-additional-img-blurred" 
                            alt=""
                            data-latest-work-read-more-popup-additional-blurred-img
                        >
                    </div>
                </div>
            </template>

            <template data-latest-work-grid-item-template>
                <div class="latest-work__grid-column-img-container" data-latest-work-grid-item data-latest-work-grid-item-id="">
                    <img src="" data-src="" data-latest-work-grid-image alt="" class="latest-work__grid-column-img">
                    <div class="latest-work__grid-column-blurred-img-container" data-latest-work-grid-blurred-image-container>
                    <img src="" alt="" class="latest-work__grid-column-blurred-img" data-latest-work-grid-blurred-image>
                    </div>
                    <button class="latest-work__grid-column-img-read-more-btn" data-latest-work-grid-item-read-more-btn>
                        <?php echo $langScript["latest-work"]["readMoreBtnText"]; ?>
                    </button>
                </div>
            </template>

        </section>
        <section class="about-us" id="about">
            <div class="responsive-wrapper flex items-center">
                <div class="text">
                    <h1>
                        <?php echo $langScript["about"]["title"]; ?>
                    </h1>
                    <p class="second-animated">
                        <?php echo $langScript["about"]["paragraph"]; ?>
                    </p>
                    <p class="third-animated">
                        <?php echo $langScript["about"]["paragraphWithLink"]; ?>
                    </p>
                </div>
                <div class="image">
                    <div class="images-mosaic">
                        <div class="radius-top-left">
                            <img src="./images/about-grid/pic-1.jpg" 
                            alt="<?php echo $langScript["about"]["mosaicImgAlt"]; ?>">
                        </div>
                        <div class="radius-top-right">
                            <img src="./images/about-grid/pic-2.jpg" 
                            alt="<?php echo $langScript["about"]["mosaicImgAlt"]; ?>">
                        </div>
                        <div class="radius-bottom-left">
                            <img src="./images/about-grid/pic-3.jpg" 
                            alt="<?php echo $langScript["about"]["mosaicImgAlt"]; ?>">
                        </div>
                        <div class="radius-bottom-right">
                            <img src="./images/about-grid/pic-4.jpg" 
                            alt="<?php echo $langScript["about"]["mosaicImgAlt"]; ?>">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="services" id="works">
            <section class="painting service">
                <div class="responsive-wrapper flex">
                    <div class="text" id="PW">
                        <div class="wrapper">
                            <h1>
                                <?php echo $langScript["services"]["painting"]["title"]; ?>
                            </h1>
                            <ul>
                                <?php echo $langScript["services"]["painting"]["startOfList"]; ?>
                                <li class="first-li">
                                    <?php echo $langScript["services"]["painting"]["works"][0]; ?>
                                </li>
                                <li class="second-li">
                                    <?php echo $langScript["services"]["painting"]["works"][1]; ?>
                                </li>
                                <li class="third-li">
                                    <?php echo $langScript["services"]["painting"]["works"][2]; ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="images">
                        <div class="painting_slider slider">
                            <div class="makeBig" data-name="Enlarge picture">
                                <img src="./images/bigger.png" alt="Make-Bigger icon">
                            </div>
                            <div class="left btn left-btn disabled">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                                <div class="half-circle left"></div>
                            </div>
                            <div class="content">
                                <img src="./images/painter-work.jpg" 
                                alt="<?php echo $langScript["services"]["painting"]["contentImgAltTexts"][0]; ?>">
                                <img src="./images/smoothing-walls.jpg" 
                                alt="<?php echo $langScript["services"]["painting"]["contentImgAltTexts"][1]; ?>">
                                <img src="./images/painting-windows.jpg" 
                                alt="<?php echo $langScript["services"]["painting"]["contentImgAltTexts"][2]; ?>">
                            </div>
                            <div class="right btn right-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                                <div class="half-circle right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="electrician_works service">
                <div class="responsive-wrapper flex row-reverse">
                    <div class="text" id="EW">
                        <div class="wrapper">
                            <h1>
                                <?php echo $langScript["services"]["electrical"]["title"]; ?>
                            </h1>
                            <ul>
                                <?php echo $langScript["services"]["electrical"]["startOfList"]; ?>
                                <li class="first-li">
                                    <?php echo $langScript["services"]["electrical"]["works"][0]; ?>
                                </li>
                                <li class="second-li">
                                    <?php echo $langScript["services"]["electrical"]["works"][1]; ?>
                                </li>
                                <li class="third-li">
                                    <?php echo $langScript["services"]["electrical"]["works"][2]; ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="images">
                        <div class="electrician_slider slider">
                            <div class="makeBig" data-name="Enlarge picture">
                                <img src="./images/bigger.png" alt="Make-Bigger icon">
                            </div>
                            <div class="left btn left-btn disabled">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                                <div class="half-circle left"></div>
                            </div>
                            <div class="content">
                                <img src="./images/electrician-work.jpg" 
                                alt="<?php echo $langScript["services"]["electrical"]["contentImgAltTexts"][0]; ?>">
                                <img src="./images/electricity-distribution.jpg" 
                                alt="<?php echo $langScript["services"]["electrical"]["contentImgAltTexts"][1]; ?>">
                                <img src="./images/electricity-distribution-2.jpg" 
                                alt="<?php echo $langScript["services"]["electrical"]["contentImgAltTexts"][2]; ?>">
                            </div>
                            <div class="right btn right-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                                <div class="half-circle right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="gypsum_works service">
                <div class="responsive-wrapper flex">
                    <div class="text" id="GW">
                        <div class="wrapper">
                            <h1>
                                <?php echo $langScript["services"]["gypsum"]["title"]; ?>
                            </h1>
                            <ul>
                                <?php echo $langScript["services"]["gypsum"]["startOfList"]; ?>
                                <li class="first-li">
                                    <?php echo $langScript["services"]["gypsum"]["works"][0]; ?>
                                </li>
                                <li class="second-li">
                                    <?php echo $langScript["services"]["gypsum"]["works"][1]; ?>
                                </li>
                                <li class="third-li">
                                    <?php echo $langScript["services"]["gypsum"]["works"][2]; ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="images">
                        <div class="gypsum_slider slider">
                            <div class="makeBig" data-name="Enlarge picture">
                                <img src="./images/bigger.png" alt="Make-Bigger icon">
                            </div>
                            <div class="left btn left-btn disabled">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                                <div class="half-circle left"></div>
                            </div>
                            <div class="content">
                                <img src="./images/gypsum-work.jpg" 
                                alt="<?php echo $langScript["services"]["gypsum"]["contentImgAltTexts"][0]; ?>">
                                <img src="./images/gypsum-partition.jpg" 
                                alt="<?php echo $langScript["services"]["gypsum"]["contentImgAltTexts"][1]; ?>">
                                <img src="./images/GYPSUM-WORK-art.jpg" 
                                alt="<?php echo $langScript["services"]["gypsum"]["contentImgAltTexts"][2]; ?>">
                                <img src="./images/GYPSUM-WORK-art-2.jpg" 
                                alt="<?php echo $langScript["services"]["gypsum"]["contentImgAltTexts"][3]; ?>">
                                <img src="./images/glue-tiles-1.png" 
                                alt="<?php echo $langScript["services"]["gypsum"]["contentImgAltTexts"][4]; ?>">
                                <img src="./images/glue-tiles-2.png" 
                                alt="<?php echo $langScript["services"]["gypsum"]["contentImgAltTexts"][5]; ?>">
                            </div>
                            <div class="right btn right-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                                <div class="half-circle right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="additional service">
                <div class="responsive-wrapper flex row-reverse">
                    <div class="text" id="AW">
                        <div class="wrapper">
                            <h1>
                                <?php echo $langScript["services"]["additional"]["title"]; ?>
                            </h1>
                            <ul>
                                <?php echo $langScript["services"]["additional"]["startOfList"]; ?>
                                <li class="first-li">
                                    <?php echo $langScript["services"]["additional"]["works"][0]; ?>
                                </li>
                                <li class="second-li">
                                    <?php echo $langScript["services"]["additional"]["works"][1]; ?>
                                </li>
                                <li class="third-li">
                                    <?php echo $langScript["services"]["additional"]["works"][2]; ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="images">
                        <div class="additional_slider slider">
                            <div class="makeBig" data-name="Enlarge picture">
                                <img src="./images/bigger.png" alt="Make-Bigger icon">
                            </div>
                            <div class="left btn left-btn disabled">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                                <div class="half-circle left"></div>
                            </div>
                            <div class="content">
                                <img src="./images/installing-laminate.jpg" 
                                alt="<?php echo $langScript["services"]["additional"]["contentImgAltTexts"][0]; ?>">
                                <img src="./images/kitchen-cabinets.jpg" 
                                alt="<?php echo $langScript["services"]["additional"]["contentImgAltTexts"][1]; ?>">
                                <img src="./images/installing-room-doors.jpg" 
                                alt="<?php echo $langScript["services"]["additional"]["contentImgAltTexts"][2]; ?>">
                                <img src="./images/room-doors-and-laminate.jpg" 
                                alt="<?php echo $langScript["services"]["additional"]["contentImgAltTexts"][3]; ?>">
                            </div>
                            <div class="right btn right-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                                <div class="half-circle right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <section class="why" id="why_sec">
            <div class="responsive-wrapper">
                <div class="text">
                    <h1>
                        <?php echo $langScript["why-us"]["title"]; ?>
                    </h1>
                    <ul>
                        <li class="first-li">
                            <?php echo $langScript["why-us"]["listItems"][0]; ?>
                        </li>
                        <li class="second-li">
                            <?php echo $langScript["why-us"]["listItems"][1]; ?>
                        </li>
                        <li class="third-li">
                            <?php echo $langScript["why-us"]["listItems"][2]; ?>
                        </li>
                        <li class="fourth-li">
                            <?php echo $langScript["why-us"]["listItems"][3]; ?>
                        </li>
                        <li class="fifth-li">
                            <?php echo $langScript["why-us"]["listItems"][4]; ?>
                        </li>
                    </ul>
                </div>
                <div class="image">
                    <img src="./images/checked-true-icon.png" 
                    alt="<?php echo $langScript["why-us"]["iconAlt"]; ?>">
                </div>
            </div>
        </section>
        <section class="contact" id="contact">
            <div class="responsive-wrapper">
                <h1>
                    <?php echo $langScript["contact"]["title"]; ?>
                </h1>
                <p>
                    <?php echo $langScript["contact"]["paragraph"]; ?>
                </p>
                <form action="/php/validateContactForm.php" method="post" name="contact" data-contact-form>
                    <input type="hidden" name="token" value="<?php echo htmlspecialchars($token, ENT_QUOTES, 'UTF-8'); ?>">
                    <input type="hidden" name="lang" value="<?php echo htmlspecialchars($langScript["lang"]); ?>">
                    <input type="hidden" name="scrollTop" value="" data-contact-scroll-top>
                    <fieldset>
                        <div class="row">
                            <div class="half-row first-hr">
                                <label for="email">
                                    <?php echo $langScript["contact"]["form"]["emailLabel"]; ?>
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    aria-describedby="emailError" 
                                    value="<?php if ($contactFormData && $contactFormData["email"]) echo $contactFormData["email"]; ?>"
                                >
                            </div>
                            <div class="half-row second-hr">
                                <label for="subject">
                                    <?php echo $langScript["contact"]["form"]["subjectLabel"]; ?>
                                </label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject" 
                                    aria-describedby="subjectError" 
                                    value="<?php if ($contactFormData && $contactFormData["subject"]) echo $contactFormData["subject"]; ?>"
                                >
                            </div>
                        </div>

                        <div class="row">
                            <div class="whole-row">
                                <label for="message">
                                    <?php echo $langScript["contact"]["form"]["messageLabel"]; ?>
                                </label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    aria-describedby="messageError"
                                ><?php if ($contactFormData && $contactFormData["message"]) echo $contactFormData["message"]; ?></textarea>
                            </div>
                        </div>

                        <div class="row align-items-center">
                            <button type="submit" data-state="" data-contact-submit-btn>
                                <span class="text"><?php echo $langScript["contact"]["form"]["sendBtnText"]; ?></span>
                                <span class="loader"></span>
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    </main>
    <footer>
        <div class="lastInfo">
            <div class="responsive-wrapper flex">
                <div class="footerText">
                    <h1>
                        <?php echo $langScript["footer"]["title"]; ?>
                    </h1>
                    <div class="number">
                        <a href="tel:<?php echo $langScript["footer"]["phone"]["mailTo"]; ?>">
                            <div class="icon">
                                <img src="./images/number-icon.png" 
                                alt="<?php echo $langScript["footer"]["phone"]["imgAlt"]; ?>">
                            </div>
                            <div class="text">
                                <span>
                                    <?php echo $langScript["footer"]["phone"]["text"]; ?>
                                </span>
                            </div>
                        </a>
                    </div>
                    <div class="mail">
                        <a href="mailto:<?php echo $langScript["footer"]["email"]["text"]; ?>">
                            <div class="icon">
                                <img src="./images/mail-icon.png" 
                                alt="<?php echo $langScript["footer"]["email"]["imgAlt"]; ?>">
                            </div>
                            <div class="text">
                                <span>
                                    <?php echo $langScript["footer"]["email"]["text"]; ?>
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="logoImage">
                    <div class="conImg">
                        <a href="#beginning" data-name="ND Binnen Renovaties">
                            <img src="./images/logo-circle-bigger-res.png" alt="ND Binnen Renovaties Logo">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="credits">
            <div class="responsive-wrapper">
                <div class="wrapper">
                    &copy; Copyright <span data-current-year></span> | Web Development and Design by <a href="https://www.linkedin.com/in/mdwebdev/" target="_blank">MDWebDev</a>
                </div>
            </div>
        </div>
    </footer>
</body>
<script defer>
    // set current year in footer
    document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
    <?php if ($contactFormResponse): ?>
        const contactFormResponseType = "<?php echo $contactFormResponse["result"]; ?>";
        const contactFormResponseMessage = "<?php echo $contactFormResponse["message"]; ?>";
        if (contactFormResponseType === "success") {
            showMessageBox(contactFormResponseMessage, "darkblue");
            localStorage.removeItem("scrollTop");
            localStorage.setItem("formSubmission", "done");
            
            setTimeout(() => {
                hideMessageBox();
            }, 6000);
        } else {
            showMessageBox(contactFormResponseMessage);
        }
    <?php endif; ?>

    // a function for displaying message box
    function showMessageBox(message, backColor = "darkgreen", color = "white")
    {
        var con = document.querySelector(".fullAlertContainer");
        var messageBox = document.querySelector(".fullAlertContainer .alert .message");
        var okBtn = document.querySelector(".fullAlertContainer .alert .btn button");
        messageBox.innerHTML = message;
        con.style.opacity = 1;
        con.style.pointerEvents = "all";
        con.style.animationName = "alert";
        okBtn.style.backgroundColor = backColor;
        okBtn.style.color = color;
    }
    // a function for hiding message box
    function hideMessageBox() {
        var con = document.querySelector(".fullAlertContainer");
        con.style.opacity = 0;
        con.style.pointerEvents = "none";
        con.style.animationName = "none";
    }
</script>
</html>
