# angular-fontawesome
A simple directive for [FontAwesome](http://fontawesome.io/) icons. Avoid writing a massive `ngStyle` declaration for your FontAwesome integration, and easily integrate 

### Usage

1. Include the module in your own app.

```javascript
angular.module('myApp', ['picardy.fontawesome'])
```

2. Use the directive on any page which bootstraps your app.

```html
<fa name="loading" spin ng-style="{'color': checkColor}"></fa>
<!-- $scope.checkColor = 'blue' -->
<!-- <i class="fa fa-loading fa-spin" style="color:blue;"></i> -->
```

### Attributes

The `fa` directive's attributes map to the [classes used by FontAwesome\.

```html
<fa name="ICON-NAME" <!-- fa-ICON-NAME -->
    size="1-5|large" <!-- fa-1x..fa-5x, fa-lg -->
    flip="horizontal|vertical" <!-- fa-flip-horizontal -->
    rotate="90|180|270" <!-- fa-rotate-90 -->
    spin[="true|false"] <!-- fa-spin -->
    border[="true|false"] <!-- fa-border -->
    list[="true|false"]  <!-- fa-li -->
></fa>
```

##### name
The icon's [name](http://fontawesome.io/icons/), such as `fa-loading` or `fa-square`.
```html
<fa name="github"></fa>
<!-- <i class="fa fa-github"></i> -->
```

##### size
The icon's font size, either defined by a multiplier (1-5), or by the string `"large"`.
```html
<fa name="square" size="<% currentSize %>"></fa>
<!-- $scope.currentSize = 3 -->
<!-- <i class="fa fa-square fa-3x"></i> -->
```

##### flip
Flip the icon `horizontal` or `vertical`.
```html
<fa name="pencil" flip="vertical"></fa>
<!-- <i class="fa fa-pencil fa-flip-vertical"></i> -->
```

##### rotate
Rotate the icon `90`, `180`, or `270` degrees.
```html
<fa name="floppy-o" rotate="90"></fa>
<!-- <i class="fa fa-floppy-o fa-rotate-90"></i> -->
```

##### spin
Animate the icon to spin. You don't need to provide true to use the boolean attributes:
```html
<fa name="loading" spin></fa>
<!-- <i class="fa fa-loading fa-spin"></i> -->
```

##### border
```html
<fa name="envelope" border></fa>
<!-- <i class="fa fa-envelope fa-border"></i> -->
```

##### fixed width
```html
<fa name="book" fw></fa>
<!-- <i class="fa fa-book fa-fw"></i> -->
```

##### inverse
```html
<fa name="home" inverse></fa>
<!-- <i class="fa fa-home fa-inverse"></i> -->
```

##### stack
coming soon


### TODO
* `fa-stack` support
* `pull="left"`, `pull="right"`

### License
MIT Licensed by [Picardy](http://beta.picardylearning.com).