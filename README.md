# ClickSpark.js

clickspark.js is a javascript utility that adds beautiful particle effects to your javascript events.    
Add image-files as single particles and configure where and when a particle fountain should be fired.

# Install

- simply install it with <a href="http://bower.io">bower.io</a>. Packagename "clickspark"    
`$ bower install clickspark`

- or copy th file clickspark.min.js manually to your project    
[clickspark.min.js][0]

    [0]: https://github.com/ymc-thzi/clickspark.js/blob/master/dist/clickspark.min.js


# Usage

## Automatic click binding (default particle effect)

use jQuery to add clickspark to every HTML element you want like this:

```javascript
$('h1').clickSpark();
```

So on a click on the h1 the default sparkle effect will be fired.

## Automatic click binding with particle-configuration (customized particle effect)

use jQuery to add clickspark to every HTML element you want and configure your particle attributes for example like this:

```javascript
$('h1').clickSpark({     
    particleImagePath: '../particle.png',     
    particleCount: 35,     
    particleSpeed: 12,     
    particleSize: 12     
});
```

| Attribute             | defaultvalue  | type   |
| --------------------- | ------------- | -----  |
| particleImagePath     | ''            | string |
| particleCount         | 35            | int    |
| particleSpeed         | 12            | int    |
| particleSize          | 12            | int    |

## independent particle binding (default particle effect)

use jQuery to fire clickspark indipendently whenever you want for example like this:

```javascript
$(document).ready(function () {
    $('button').click(function () {
        clickSpark.fireParticles($('.sparkingPlace'));
    });
});
```

The particles will be targeted to the position of the html-element with the class ".sparkingPlace". So you can postion the 
particle target wherever you want.

## global particle configuration

use these clickspark-methods to set the attributes for your particle effect:

```javascript
    clickSpark.setParticleCount(50);
    clickSpark.setParticleSize(12);
    clickSpark.setParticleSpeed(12);
    clickSpark.setParticleImagePath('../particle-3.png');
```

See default values above for not set attributes 

# Dependencies
* jQuery


