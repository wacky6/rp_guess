﻿{% extends 'template.swig' %}

{%- block content %}
    <h2>恭喜，尼抢到了 {{cash}} CNY 的红包。</h2>
    <p>红包会在抢完后由std::weak从支付宝发出。</p>
    <p>如果还想要更多的话就去缠着屈大大要吧 :D</p>
{%- endblock %}
