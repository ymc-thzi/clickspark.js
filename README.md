# ClickSpark.js

ClickSpark.js is a javascript utility that adds beautiful particle effects to your javascript events.    
Add image-files as single particles and configure where and when a particle fountain should be fired.    
<a target="_blank" href="http://www.ymc.ch/sandbox/clickspark/demo.html">TEST THE DEMO</a>

<a target="_blank" href="http://www.ymc.ch/sandbox/clickspark/demo.html">
<img src="http://www.ymc.ch/sandbox/clickspark/sparkling-demo-1.11.0.gif"></a>

# Install

- Installation with <a target="_blank" href="https://www.npmjs.com/package/clickspark.js">npm</a>: packagename "clickspark.js"    
`$ npm install clickspark.js`

- Installation with <a target="_blank" href="https://libraries.io/bower/clickspark">bower.io</a>: packagename "clickspark"    
`$ bower install clickspark`

- Manual installation: copy and link the file clickspark.min.js to your project    
[clickspark.min.js][1]
 
 [1]: https://github.com/ymc-thzi/clickspark.js/blob/master/dist/clickspark.min.js


# Usage

## Automatic click binding (default particle effect)

use jQuery to add ClickSpark to HTML-elements:

```javascript
$('h1').clickSpark();
```

On a click on the h1 the default sparkling effect will be fired.

## Automatic configured click binding (customized particle effect)

use jQuery to add ClickSpark to HTML-elements. Configure particle attributes for example like this:

```javascript
$('h1').clickSpark({     
    particleImagePath: '../particle.png',     
    particleCount: 35,     
    particleSpeed: 12,     
    particleSize: 12,
    particleRotationSpeed: 20,
    particleDuration: 400,  
    animationType: 'explosion',
    callback: function() { /*do something, follow href for example*/ } 
});
```

| Attribute             | default       | type   |
| --------------------- | ------------- | -----  |
| particleImagePath     |               | string |
| particleCount         | 35            | int    |
| particleSpeed         | 12            | int    |
| particleSize          | 12            | int    |
| particleRotationSpeed |  0            | int    |
| particleDuration      | 400           | int    |
| animationType         | 'explosion'   | string |
| callback              |               | func() |

animationTypes:

* explosion
* splash
* falloff
* blowright
* blowleft

## Independent particle binding (default particle effect)

use jQuery to fire ClickSpark independently for example like this:

```javascript
$(document).ready(function () {
    $('button').click(function () {
        clickSpark.fireParticles($('.sparklingDiv'));
    });
});
```

The particles will be targeted to the center position of the HTML-element with the className ".sparklingDiv".
So the particle target can be placed everywhere via CSS.

## Global particle configuration

use these ClickSpark methods to set the attributes for your particle effect:

```javascript
    clickSpark.setParticleCount(50);
    clickSpark.setParticleSize(12);
    clickSpark.setParticleSpeed(12);
    clickSpark.setParticleImagePath('../particle.png');
    clickSpark.setParticleRotationSpeed(20);
    clickSpark.setParticleDuration(400);
    clickSpark.setAnimationType('explosion');
    clickSpark.setCallback: (function() { /*do something, follow href for example*/ }); 
```

# Dependencies
* jQuery

# Browser Support
| Browser  | <img src="http://www.w3schools.com/images/compatible_chrome.gif">  | <img src="http://www.w3schools.com/images/compatible_ie.gif"> | <img src="http://www.w3schools.com/images/compatible_firefox.gif"> | <img src="http://www.w3schools.com/images/compatible_safari.gif"> | <img src="http://www.w3schools.com/images/compatible_opera.gif"> |
| -------- | -------------------------------------------------------------------| --------------------------------------------------------------|--------------------------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------| 
| Version  | 4.0                                                                | 9.0                                                           | 2.0                                                                | 3.1                                                               | 9.0                                                              |