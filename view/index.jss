{% extends 'template.swig' %}

{%- block content %}
<h1>酷爱来抢红包！</h1>
<h3><strong>请用一个健康的浏览器，不然被[发好人]卡别怪我。</strong></h3>
<h4>红包池中还剩{{num}}个，总额{{cash}} CNY，剩余红包最高{{top}} CNY</h4>
<form action="submit.jss" method="POST" accept-charset="UTF-8">
  <span>支付宝：</span><input name='alipay' type='text'></input><br />
  <input type="submit" value="抢！红！包！"></input>
</form>
<h5><strong>
  提交前请检查支付宝帐号是否正确，<br />
  不要试图抢多份红包，不然你会获得双份好人卡  :D
</strong></h5>
{%- endblock %}
