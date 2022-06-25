"use strict"

$(document).ready(function(){
  console.log( $('#loading'))
  $('#loading').fadeOut(2000)
})
const imgePath = 'https://image.tmdb.org/t/p/w500/'
const moviesCategory = $('#moviesCategory')
const searchInput = document.querySelector('#searchInput');
const categoryTitle = document.querySelector('#categoryTitle')
const key = '37a194ab674674d3542bdfa59c52f54f'

searchInput.addEventListener('input', async function(){
  if(searchInput.value != ''){
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput.value}&page=1`)
    const data = await res.json();
    if(res.ok){
      if(data.results.length != 0){
        categoryTitle.innerHTML = `<span class="fs-5 text-white">The results about:</span> "${searchInput.value}"`
        display(data.results)
  
      }else{
        categoryTitle.innerHTML = `<span class="fs-5 text-white">There no results about:</span> "${searchInput.value}"`
        display(data.results)
        $(moviesCategory).html(
          `
          <div class="col-md-12 text-white text-center fs-2 py-5">
            Sorry, There no results about your search :(
          </div>
          `
        )
      }
      
    }else{
        console.log('Sometheng went wrong')
    }
  }else{
    categoryTitle.innerHTML = `New Playing`
    getData('/movie/now_playing');
  }
})
 
$('#menu li span').click(function(){
  if($(this).attr('id') != undefined){
    getData($(this).attr('id'))
    categoryTitle.innerHTML = $(this).html()
  }
})

const getData = async category => {
    
      const res = await fetch(`https://api.themoviedb.org/3${category}?api_key=${key}`)
      const data = await res.json();
      if(res.ok){
        display(data.results)
      }else{
          console.log('Sometheng went wrong')
          displaySlider('', true)
      }
}
getData('/movie/now_playing');


function display(json){
  let conatiner = '';
  console.log(json)
  for(let i=0; i<json.length; i++){
    conatiner += `
    <div class="col-md-4 wow bounceInUp">
        <div class="movieBox position-relative">
          <img src=${imgePath+json[i].poster_path} class='w-100' alt="">
          <div class="movieDetails position-absolute  d-flex flex-column justify-content-around">
          <img src=${imgePath+json[i].backdrop_path} class='w-100 h-100 position-absolute' /> 
                <div class="">
                    <h3 class="main-text text-center">${json[i].original_title}</h3>
                    <span class="me-3">${json[i].vote_average}</span>
                    <span>${json[i].release_date}</span>
                   
                    <p>${json[i].overview}</p>
                    
                  </div>
                  <div class="play d-flex justify-content-center">
                    <button class="rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fa fa-play fa-3x"></i>
                    </button>
                  </div>
          </div>
        </div>
      </div>
    `
  }
  moviesCategory.html(
    conatiner
  )
}


 $('#control-btn').click(function(){
    $('#menu li span').each(function(){
      if($(this).css('opacity') === '0'){
        setTimeout(()=>{
          $(this).css({
          opacity: '1',
          top: '50%',
          transform: 'translateY(-50%)'})
        }, 500)
        
      }else{
        $(this).css({
          opacity: '0',
          top: '300%',
        })
      }
    })
 }) 

let toggleBtnWidth = $('#toggle-btn').outerWidth()
$('#toggle-btn').css('right', `-${toggleBtnWidth}px`)
let menuWidth = $('#menu').outerWidth()
$('#menu').css('left', `-${menuWidth}px`)
$('#control-btn').click(function(){
  //console.log($('#menu').css('left'))
  if($('#menu').css('left') == '0px'){
      $('#menu').css('left', `-${menuWidth}px`)
      $(this).addClass('fa-bars')
      $(this).removeClass('fa-xmark')
  }else{
      $('#menu').css('left', 0);
      $(this).removeClass('fa-bars')
      $(this).addClass('fa-xmark')
  }
})

/*Contact Validation*/
let praintAlert = (id, msg, show=true)=>{
  if(show){
    $(id).html(`
      <div class="alert alert-danger" role="alert">
        ${msg}
      </div>`
    );
  }else{
    $(id).html(``);
  }
}
let addValidationClass = (elem, valid=true)=>{
    if(valid){
      $(elem).removeClass('is-invalid')
      $(elem).addClass('is-valid')
    }else{
      $(elem).addClass('is-invalid')
      $(elem).removeClass('is-valid')
    }
}

/*Validate User Name*/
const username = document.getElementById('username')
username.addEventListener('input', function(e){
  e.preventDefault();
  usernameValidation(this.value)
  removeDisabled()
})

let usernameValidation = (value)=>{
  let RegExp = /^[\w\s_\.@]{4,20}$/;
  if(value != undefined){
    if(!RegExp.test(value)){
      addValidationClass(username, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertName', '', false)
      }
      else if(value.length < 4){
        praintAlert('#alertName', 'Your name should be 4 characters at less')
      }else if(value.length > 20){
        praintAlert('#alertName', 'Your name should\'nt more than 20 characters')
      }else{
        praintAlert('#alertName', 'You can use letters, numbers, spaces and [@ . _]')
      }
      return false;
    }else{
      addValidationClass(username)
      praintAlert('#alertName', '', false)
      return true
    }
  }else{
    return false
  }
  
}

/*Validate Email*/
const userEmail = document.getElementById('userEmail')
userEmail.addEventListener('input', function(e){
  e.preventDefault();
  userEmailValidation(userEmail.value)
  removeDisabled()
})

let userEmailValidation = (value)=>{
  let RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if( value != undefined){
      if(!RegExp.test(value)){
      addValidationClass(userEmail, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertEmail', '', false)
      }
      else{
        praintAlert('#alertEmail', 'Please Inter Correct Email')
      }
      return false
    }else{
      addValidationClass(userEmail)
      praintAlert('#alertEmail', '', false)
      return true
    }
  }else{
    return false
  }
  
} 

/*Validate Phone*/
const userPhone = document.getElementById('userPhone')
userPhone.addEventListener('input', function(e){
  e.preventDefault();
  userPhonelValidation(this.value)
  removeDisabled()
})

let userPhonelValidation = (value)=>{
  let RegExp = /^01[0125][0-9]{8}$/
  if(value != undefined){
    if(!RegExp.test(value.trim())){
      addValidationClass(userPhone, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertPhone', '', false)
      }
      else{
        praintAlert('#alertPhone', 'Please Inter Correct Phone Number')
      }
      return false
    }else{
      addValidationClass(userPhone)
      praintAlert('#alertPhone', '', false)
      return true
    }
  }else{
    return false
  }
  
} 
/*Validate Age*/
const userAge = document.getElementById('userAge')
userAge.addEventListener('input', function(e){
  e.preventDefault();
  userAgelValidation(this.value)
  removeDisabled()
})

let userAgelValidation = (value)=>{
  let RegExp = /^([1-8][0-9]|90)$/
  if(value != undefined){
    if(!RegExp.test(value.trim())){
      addValidationClass(userAge, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertAge', '', false)
      }
      else{
        praintAlert('#alertAge', 'Please Inter Correct Age')
      }
      return false
    }else{
      addValidationClass(userAge)
      praintAlert('#alertAge', '', false)
      return true
    }
  }else{
    return false
  }
 
} 
/*Validate Pass*/
const userPass = document.getElementById('userPass')
userPass.addEventListener('input', function(e){
  e.preventDefault();
  userPassValidation(this.value)
  removeDisabled()
})

let userPassValidation = (value)=>{
  let RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  if( value != undefined){
    if(!RegExp.test(value.trim())){
      addValidationClass(userPass, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertPass', '', false)
      }else if(value.length < 8){
        praintAlert('#alertPass', 'Your password have to 8 characters at less')
      }
      else if(value.length > 16){
        praintAlert('#alertPass', 'Your password should\'nt be more than 16 characters')
      }
      else{
        praintAlert('#alertPass', 'Your password have to contain a number at less and a sympol Like [!@#$%^&*], and letters')
      }
      return false
    }else{
      addValidationClass(userPass)
      praintAlert('#alertPass', '', false)
      return true
    }
  }else{
    return false
  }
  
} 
const userVPass = document.getElementById('userVPass')
userVPass.addEventListener('input', function(e){
  e.preventDefault();
  userPassMatch(this.value)
  removeDisabled()
})

let userPassMatch = (value)=>{
if(value != undefined){
  if(value != userPass.value){
    addValidationClass(userVPass, false)
    praintAlert('#alertVPass', 'Your password not match, please check your password above') 
    return false
  }else{
      addValidationClass(userVPass)
      praintAlert('#alertVPass', '', false)
      return true
   }
}else{
  return false
}
} 

// let form = document.querySelector('form')

let removeDisabled =()=>{
  if(usernameValidation(username.value) &&
    userEmailValidation(userEmail.value) &&
    userPhonelValidation(userPhone.value) &&
    userAgelValidation(userAge.value) &&
    userPassValidation(userPass.value) &&
    userPassMatch(userVPass.value)){
      console.log('it\'s ready')
      $('#submitBtn').attr('disabled', false)
    }else{
      $('#submitBtn').attr('disabled', true)
    }
}


$('#showPass').click(function(){
  if($(userPass).attr('type') === 'password'){
    $(userPass).attr('type', 'text')
    $(userVPass).attr('type', 'text')
    $(this).addClass('fa-eye-slash')
    $(this).removeClass('fa-eye')
  }else{
    $(userPass).attr('type', 'password')
    $(userVPass).attr('type', 'password')
    $(this).removeClass('fa-eye-slash')
    $(this).addClass('fa-eye')
  }

  
})
$(window).scroll(function(){
  if($(window).scrollTop() > 1000){
      $('#btn-up').fadeIn(500)
  }else{
      $('#btn-up').fadeOut(500)
  }
})
$('#btn-up').click(function(){
  $('html,body').animate({scrollTop: 0}, 1000);
})
$('#menu a').click(function(){
   $('body,html').animate({scrollTop: $($(this).attr('href')).offset().top}, 1000)
})

new WOW().init();