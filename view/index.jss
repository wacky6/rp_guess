{% extends 'template.swig' %}

{%- block title %}
<h1>酷爱来抢红包！</h1>
{%- endblock %}
{%- block content %}
<h3><strong>请用一个健康的浏览器，不然会被发[好人卡]。</strong></h3>
<h4>红包还剩{{num}}个，总额{{cash}} CNY，剩余红包最高{{top}} CNY</h4>
<form action="roll" method="POST" accept-charset="UTF-8">
  <input name='alipay' class="text" type='text' placeholder="支付宝账号"></input>
  <input type="submit" class="button" value="抢！红！包！"></input>
</form>
<strong><pre>
提交前请检查支付宝帐号是否正确，
如果你抢到了多份红包：
    不仅可以获得双份好人卡，
    还会获得 (std::膜拜)     :D
</pre></strong>
{%- endblock %}
