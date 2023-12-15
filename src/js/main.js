'use strict';

import '../styles/main.sass'
import 'aos/dist/aos.css'
import $ from 'jquery'
import { startFireworks } from './fireworks.js'
import AOS from 'aos'

$(document).ready(function() {
    const background_music = new Audio('./media/let-it-snow.mp3');
    const fireworks = new Audio('./media/fireworks.mp3');

    AOS.init({
        duration: 800,
    });

    $('body').addClass('snowfall');

    $('#start-btn').on('click', () => {
        background_music.volume = 0.075;
        background_music.play();
    });

    $(background_music).on('ended', () => {
        background_music.currentTime = 0;
        background_music.play();
    });

    $('.next-slide').on('click', function() {
        if($(this).closest('.wish-slide').next().hasClass('wish-slide')) $(this).closest('.wish-slide').removeClass('active').next().addClass('active');
    });

    $('.prev-slide').on('click', function() {
        if($(this).closest('.wish-slide').prev().hasClass('wish-slide')) $(this).closest('.wish-slide').removeClass('active').prev().addClass('active');
    });

    $('.show-wish').on('click', function() {
        $(this).addClass('hide').next().addClass('show');
    });

    $('#end-btn').on('click', function() {
        $('body').addClass('fireworks');
        $('#fireworks').fadeIn(1000);

        setTimeout(() =>  startFireworks(), 1000);

        fireworks.volume = 0.1;
        fireworks.play();
    });

    $('#call-santa').on('click', function() {
        $('body').removeClass('fireworks');
        $('#fireworks').fadeOut(1000);

        fireworks.animate({volume: 0}, 1000);

        setTimeout(() => {
            $('#fireworks').remove();
            $('#santa-popup').addClass('active');
            fireworks.pause();
        }, 1000);
    });

    $('.santa-option').on('click', function() {
        $('.santa-option').not( $(this).addClass('selected') ).removeClass('selected');

        $('#get-gift').prop('disabled', false);
    });

    let behavior;

    $('#get-gift').on('click', function() {
        if( !$(this).is(':disabled') ) {
            behavior = $('.santa-option.selected').data('option');

            $('.wish-slide').not($('.gift-slide').addClass('active')).removeClass('active');

            $('#santa-popup').removeClass('active');
        }
    });

    $('.gift-wrapper').on('click', function() {
        $(this).addClass('open')
        setTimeout(() => $(`.my-gift.${behavior}`).addClass('active'), 500);
    });
});