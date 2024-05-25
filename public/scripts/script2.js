"use strict"

const checkInInput = document.getElementById('checkIn');
const today = new Date();
const formattedToday = today.toISOString().split('T')[0];
checkInInput.setAttribute('min', formattedToday);

const checkOutInput = document.getElementById('checkOut');
const today2 = new Date();
const formattedToday2 = today2.toISOString().split('T')[0];
checkOutInput.setAttribute('min', formattedToday2);