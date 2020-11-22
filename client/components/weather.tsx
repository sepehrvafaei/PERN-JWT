declare var require: any

var React = require('react');
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ScriptTag from 'react-script-tag';
import '/WeatherStyle.css'


const Navbar = (props) => {
    return (
        <div class="weather-section">
            <ScriptTag type="text/javascript" src='/weatherScript.js' defer/>
            <div class="location">
                <h2 class="timezone">Coquitlam,BC,Canada</h2>
            </div>
            <div class="temperature">
                <img class="icon" width="128" height="128"/>
                <h3 class="observation"></h3>
                <div class="degree-section">
                    <h3 class="tempDeg">#</h3>
                </div>
                <h3 class="tempDes">description</h3>
            </div>
            <div class="temperature">
                 <img class="icon" width="128" height="128"/>
                <h3 class="observation"></h3>
                <div class="degree-section">
                    <h3 class="tempDeg">#</h3>
                </div>
                <h3 class="tempDes">description</h3>
            </div>
            <div class="temperature">
                <img class="icon" width="128" height="128"/>
                <h3 class="observation"></h3>
                <div class="degree-section">
                    <h3 class="tempDeg">#</h3>
                </div>
                <h3 class="tempDes">description</h3>
            </div>
            <div class="temperature">
                <img class="icon" width="128" height="128"/>
                <h3 class="observation"></h3>
                <div class="degree-section">
                    <h3 class="tempDeg">#</h3>
                </div>
                <h3 class="tempDes">description</h3>
            </div>
            <div class="temperature">
                <img class="icon" width="128" height="128"/>
                <h3 class="observation"></h3>
                <div class="degree-section">
                    <h3 class="tempDeg">#</h3>
                </div>
                <h3 class="tempDes">description</h3>
            </div>
            <div id="control-slide">
                <button id="prev" onclick="plusSlides(-1)">&#10094;</button>
                <button id="next" onclick="plusSlides(1)">&#10095;</button>
                <ScriptTag>
                    var slideIndex = 1;
                     
                    function showSlides(n) {
                        var i;
                        var slides = document.getElementsByClassName("temperature");
                        if (n > slides.length) {slideIndex = 1}
                        if (n < 1) {slideIndex = slides.length}
                        for (i = 0; i < slides.length; {
                        slides[i].style.display = "none";
                        }
                        slides[slideIndex - 1].style.display = "block";
                    }
                    showSlides(slideIndex);

                    function plusSlides(n) {
                        showSlides(slideIndex += n);
                    }
                </ScriptTag>
            </div>               
        </div>
    );
};
export default Navbar;