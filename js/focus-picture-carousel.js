$(document).ready(function(){
  let index = 1;//当前为第几张图片
  let timeoutId;
  let moving = false;
  timeoutId = setTimeout(autoMove,5000);
  //为左右翻页添加点击事件
  $("#left").click(function(event){
    event.preventDefault();
    if(!moving){
      index -= 1;
      activeBtn();
      move(480);
    }
  });
  $("#right").click(function(event){
    event.preventDefault();
    if(!moving){
      index += 1;
      activeBtn();
      move(-480);
    }
  });
  //为下方按钮添加点击事件
  $(".button-group").click(function(event){
    let $target = $(event.target);
    if($target.is("span")){
      if(!moving){
        let cur_index = parseInt($(this).find(".active").attr("index"));
        index = parseInt($target.attr("index"));
        activeBtn();
        move(-480 * (index - cur_index));
      }
    }
  });
  $(".focus").mouseenter(function(event){
    $(".arrow").css("visibility","visible");
    clearTimeout(timeoutId);//取消自动轮播
  })
  .mouseleave(function(event){
    $(".arrow").css("visibility","hidden");
    timeoutId = setTimeout(autoMove,5000);//重新设置自动轮播
  });
  /**
  * 这个函数用于移动图片，接收一个移动参数
  * @param dis为需要移动的距离
  */
  function move(dis){
    moving = true;
    let $picture = $(".picture");
    let left = parseInt($picture.css("left"));
    left += dis;
    $picture.animate({left:left},400,"linear",function(){
      if(left > -480){
        left = -2880;
      }
      if(left < -2880){
        left = -480;
      }
      $picture.css("left",left + "px");
      moving = false;
    });
  }
  /**
  * 这个函数是用于点亮下方的几个小按钮的
  */
  function activeBtn(){
    if(index < 1){
      index = 6;
    }
    if(index > 6){
      index = 1;
    }
    let $cur_active = $(".button-group").find(".active");
    if($cur_active.attr("index") !== index){
      $cur_active.removeClass("active");
      $(".button-group").find('[index=' + index +']').addClass("active");
    }
  }
  /**
   * 实现焦点图自动轮播
   */
  function autoMove(){
    index += 1;
    activeBtn();
    move(-480);
    timeoutId = setTimeout(autoMove,5000);
  }
});
