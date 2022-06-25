/*
#Slidebar: to controle in hide and show side baer and change the colors
## prameters: 
### sidbar: sidebar's selctor 
### togglebtn: btn selctore that you'll open and close the sidebar
### colorElems: the group of elements that you'll based on them to change site main color.
*/

class Sidebar {
    constructor(sidebar= '.color-box', toggleBtn='#color-box-switch', colorElems ='.color-option'){
        this.sidebar = sidebar
        this.toggleBtn = toggleBtn;
        this.sidebarWidth = $(this.sidebar).outerWidth();
        console.log(this.sidebarWidth)
        $(this.sidebar).css('right', `-${this.sidebarWidth}px`)
        this.widthToggleBtn =  $(this.toggleBtn).outerWidth();
        console.log(this.widthToggleBtn)
        $(this.toggleBtn).css('left', `-${this.widthToggleBtn}px`)
        this.colorElems = colorElems;
        this.root = document.documentElement
    }
    /*
    # toggleSidebar: to hide and show your site
    ## Prameters:
    ### duration: the time that you want to hide and show the sidebar through it
    */
    toggleSidebar = (duration=1500)=>{
        $(this.toggleBtn).click(()=>{
            $(this.toggleBtn).children().toggleClass('fa-spin')
            if($(this.sidebar).css('right') == '0px'){
                $(this.sidebar).animate({'right':`-${this.sidebarWidth}px`}, duration)
            }else{
                $(this.sidebar).animate({'right': 0}, duration)
            }
        })
    }
    /*
    # pickColor: to change the side color
    ## prameters
    ### mainColor: is the CSS variable that you want based on it to chnage color
    ### border: to controll in border true/false
    ### borderWidth, borderStyle, borderColor: to coustmize the border.
    */
    pickColor = (mainColor='--main-color', border=true, borderWidth='1px', borderStyle='solid', borderColor='#ddd')=>{
        let borderCss = {
            borderWidth,
            borderColor,
            borderStyle 
        }
        if(border){
            $('.default').css(borderCss)
        }
        $(this.colorElems).click(function(){
            document.documentElement.style.setProperty(mainColor, $(this).css('background-color'))
            if(border){
                $(this).css(borderCss)
                $(this).parent().siblings().children().css('border', 'none')
            }
        })
    }
}

let sidebar = new Sidebar()

sidebar.toggleSidebar();
sidebar.pickColor();
