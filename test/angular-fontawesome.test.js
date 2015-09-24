'use strict';

/* global inject: true, module: true */

describe('angular-fontawesome', function () {

  beforeEach(module('picardy.fontawesome'));

  afterEach(inject(function ($rootScope) {
    delete $rootScope.options;
  }));

  describe('constructor', function () {
    var elm;

    beforeEach(inject(function ($rootScope, $compile) {
      elm = angular.element('<fa></fa>');
      $compile(elm)($rootScope);
      $rootScope.$digest();
    }));

    it('should have the fa class all the time', function () {
       expect(elm.hasClass('fa')).toBe(true);
    });
  });

  describe('string-based attributes', function () {
    describe('name', function () {
      var elm, scope;

      beforeEach(inject(function ($rootScope, $compile) {
        elm = angular.element('<fa name="{{ options.name }}"></fa>');
        scope = $rootScope;
        $compile(elm)(scope);

        $rootScope.options = $rootScope.options || {};
        $rootScope.options.name = 'square';
        $rootScope.$digest();
      }));

      it('should replace the <fa> tag with an <span> tag that contains the proper classes', function () {
        expect(elm.prop('tagName')).toBe('SPAN');
        expect(elm.hasClass('fa-square')).toBe(true);
        expect(elm.attr('aria-hidden')).toBe('true');
      });

      it('should be able to change the used icon during the $digest cycle', function () {
        scope.options.name = 'book';
        scope.$digest();

        expect(elm.hasClass('fa-square')).not.toBe(true);
        expect(elm.hasClass('fa-book')).toBe(true);
      });
    });

    describe('size', function () {
      var elm, scope;
      beforeEach(inject(function ($rootScope, $compile) {
        elm = angular.element('<fa name="book" size="{{ options.size }}"></fa>');
        scope = $rootScope;

        $rootScope.options = $rootScope.options || {};

        $compile(elm)(scope);
        scope.$digest();
      }));

      it('should handle the "large" string', function () {
        scope.options.size = 'large';
        scope.$digest();

        expect(elm.hasClass('fa-lg')).toBe(true);
      });

      it('should handle integers', function () {
        scope.options.size = 1;
        scope.$digest();

        expect(elm.hasClass('fa-1x')).toBe(true);
      });

      it('should reject non-conforming input', function () {
        scope.options.size = 'a';
        scope.$digest();

        expect(elm.hasClass('fa-ax')).not.toBe(true);
      });

      it('should clear existing classes', function () {
        scope.options.size = 'large';
        scope.$digest();

        expect(elm.hasClass('fa-lg')).toBe(true);

        scope.options.size = 1;
        scope.$digest();

        expect(elm.hasClass('fa-1x')).toBe(true);
        expect(elm.hasClass('fa-lg')).not.toBe(true);
      });

      it('should handle any and all ints, including unsupported ones', function () {
        var i;

        for (i = 0; i < 100; i++) {
          scope.options.size = i;
          scope.$digest();

          expect(elm.hasClass('fa-' + i + 'x')).toBe(true);
          expect(elm.hasClass('fa-' + (i - 1) + 'x')).not.toBe(true);
        }
      });
    });

    describe('flip', function () {
      var elm, scope;
      beforeEach(inject(function ($rootScope, $compile) {
        elm = angular.element('<fa name="book" flip="{{ options.flip }}"></fa>');
        scope = $rootScope;

        $rootScope.options = $rootScope.options || {};

        $compile(elm)(scope);
        scope.$digest();
      }));

      it('should handle any string #futureproofing', function () {
        scope.options.flip = 'horizontal';
        scope.$digest();
        expect(elm.hasClass('fa-flip-horizontal')).toBe(true);

        scope.options.flip = 'vertical';
        scope.$digest();
        expect(elm.hasClass('fa-flip-vertical')).toBe(true);

        scope.options.flip = 'foobar';
        scope.$digest();
        expect(elm.hasClass('fa-flip-foobar')).toBe(true);
      });

      it('should clear existing classes', function () {
        scope.options.flip = 'horizontal';
        scope.$digest();
        expect(elm.hasClass('fa-flip-horizontal')).toBe(true);

        scope.options.flip = 'vertical';
        scope.$digest();
        expect(elm.hasClass('fa-flip-vertical')).toBe(true);
        expect(elm.hasClass('fa-flip-horizontal')).not.toBe(true);
      });
    });

    describe('rotate', function () {
      var elm, scope;

      beforeEach(inject(function ($rootScope, $compile) {
        elm = angular.element('<fa name="shield" rotate="{{ options.rotate }}"></fa>');
        scope = $rootScope;

        $rootScope.options = $rootScope.options || {};
        $compile(elm)(scope);
        scope.$digest();
      }));

      it('should handle any int #futureproofing', function () {
        scope.options.rotate = 90;
        scope.$digest();
        expect(elm.hasClass('fa-rotate-90')).toBe(true);

        scope.options.rotate = 180;
        scope.$digest();
        expect(elm.hasClass('fa-rotate-180')).toBe(true);

        scope.options.rotate = 270;
        scope.$digest();
        expect(elm.hasClass('fa-rotate-270')).toBe(true);
      });

      it('should handle any string #futureproofing', function () {
        scope.options.rotate = '90';
        scope.$digest();
        expect(elm.hasClass('fa-rotate-90')).toBe(true);

        scope.options.rotate = '180';
        scope.$digest();
        expect(elm.hasClass('fa-rotate-180')).toBe(true);

        scope.options.rotate = '270';
        scope.$digest();
        expect(elm.hasClass('fa-rotate-270')).toBe(true);
      });

      it('should clear existing classes', function () {
        scope.options.rotate = 90;
        scope.$digest();
        expect(elm.hasClass('fa-rotate-90')).toBe(true);

        scope.options.rotate = 180;
        scope.$digest();
        expect(elm.hasClass('fa-rotate-180')).toBe(true);
        expect(elm.hasClass('fa-rotate-90')).not.toBe(true);
      });
    });

    describe('alt', function () {
      it('should add an element after the icon if alt text exists', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" alt="{{ options.alt }}"></fa>');
          scope = $rootScope;

          scope.options = {alt: 'my text'};

          $compile(elm)(scope);
          scope.$digest();

          expect(elm.next().hasClass('sr-only')).toBe(true);
          expect(elm.next().hasClass('fa-alt-text')).toBe(true);
          expect(elm.next().text()).toBe('my text');

          done();
        });
      });

      it('should bind to an expression', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" alt="{{ options.alt }}"></fa>');
          scope = $rootScope;

          scope.options = {alt: 'old text'};

          $compile(elm)(scope);
          scope.$digest();
          expect(elm.next().text()).toBe('old text');

          scope.options.alt = 'my text';
          scope.$digest();
          expect(elm.next().text()).toBe('my text');

          scope.options.alt = 'my newer text';
          scope.$digest();
          expect(elm.next().text()).toBe('my newer text');

          done();
        });
      });

      it('should only insert the element if alt text is present', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" alt=""></fa>');
          scope = $rootScope;

          $compile(elm)(scope);
          scope.$digest();
          expect(elm.next()).toEqual({});

          done();
        });
      });

      it('should not mess with an existing sibling', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" alt="{{ options.alt }}"></fa>');
          elm.after('<span>my non-sr label</span>');
          scope = $rootScope;

          scope.options = {alt: 'old text'};

          $compile(elm)(scope);
          scope.$digest();
          expect(elm.next().text()).toBe('old text');
          expect(elm.next().next().text()).toBe('my non-sr label');

          done();
        });
      });

      it('should remove the alt element if alt text has been removed', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" alt="{{ options.alt }}"></fa>');
          scope = $rootScope;

          $rootScope.options = {alt: 'old text'};

          $compile(elm)(scope);
          scope.$digest();
          expect(elm.next().text()).toBe('old text');

          delete scope.options.alt;
          scope.$digest();
          expect(elm.next()).toEqual({});

          done();
        });
      });
    });
  });

  describe('boolean attributes', function () {
    describe('spin', function () {
      it('should set the class if the attr is present with no value', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="loading" spin></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-spin')).toBe(true);

          done();
        });
      });

      it('should be set to false if it\'s declared', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="loading" spin="false"></fa>');
          scope = $rootScope;
          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-spin')).toBe(false);

          done();
        });
      });

      it('should bind to an expression', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="loading" spin="{{ options.loading }}"></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          scope.options.loading = true;
          scope.$digest();
          expect(elm.hasClass('fa-spin')).toBe(true);

          scope.options.loading = false;
          scope.$digest();
          expect(elm.hasClass('fa-spin')).toBe(false);

          done();
        });
      });
    });

    describe('border', function () {
      it('should set the class if the attr is present with no value', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="loading" border></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-border')).toBe(true);

          done();
        });
      });

      it('should be set to false if it\'s declared', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="loading" border="false"></fa>');
          scope = $rootScope;
          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-border')).toBe(false);

          done();
        });
      });

      it('should bind to an expression', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="loading" border="{{ options.border }}"></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          scope.options.border = true;
          scope.$digest();
          expect(elm.hasClass('fa-border')).toBe(true);

          scope.options.border = false;
          scope.$digest();
          expect(elm.hasClass('fa-border')).toBe(false);

          done();
        });
      });
    });

    describe('fw', function () {
      it('should set the class if the attr is present with no value', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="square" fw></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-fw')).toBe(true);

          done();
        });
      });

      it('should be set to false if it\'s declared', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="square" fw="false"></fa>');
          scope = $rootScope;
          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-fw')).toBe(false);

          done();
        });
      });

      it('should bind to an expression', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="square" fw="{{ options.fw }}"></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          scope.options.fw = true;
          scope.$digest();
          expect(elm.hasClass('fa-fw')).toBe(true);

          scope.options.fw = false;
          scope.$digest();
          expect(elm.hasClass('fa-fw')).toBe(false);

          done();
        });
      });
    });

    describe('inverse', function () {
      it('should set the class if the attr is present with no value', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" inverse></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-inverse')).toBe(true);

          done();
        });
      });

      it('should be set to false if it\'s declared', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" inverse="false"></fa>');
          scope = $rootScope;
          $compile(elm)(scope);
          scope.$digest();

          expect(elm.hasClass('fa-inverse')).toBe(false);

          done();
        });
      });

      it('should bind to an expression', function (done) {
        var elm, scope;

        inject(function ($rootScope, $compile) {
          elm = angular.element('<fa name="github" inverse="{{ options.inverse }}"></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();

          scope.options.inverse = true;
          scope.$digest();
          expect(elm.hasClass('fa-inverse')).toBe(true);

          scope.options.inverse = false;
          scope.$digest();
          expect(elm.hasClass('fa-inverse')).toBe(false);

          done();
        });
      });
    });
  });

  describe('conditional attributes', function () {
    describe('list', function () {});

    // describe('stacks', function () {});

    describe('ratings stars', function () {});
  });

  describe('demo tests', function () {
    it('should handle normal directives, such as ng-class', function (done) {
      var elm, scope;

      inject(function ($rootScope, $compile) {
        elm = angular.element('<fa name="{{ options.name }}" ng-class="{\'boom\': options.booming}" ng-style="{\'color\': options.color}"></fa>');
        scope = $rootScope;
        $compile(elm)($rootScope);
        $rootScope.$digest();

        scope.options = scope.options || {};
        scope.options.name = 'square';
        scope.options.color = 'blue';
        scope.$digest();

        expect(elm.hasClass('fa')).toBe(true);
        expect(elm.hasClass('fa-square')).toBe(true);
        expect(elm.hasClass('boom')).toBe(false);
        expect(elm.css('color')).toBe('blue');

        scope.options.name = 'envelope';
        scope.options.color = 'red';
        scope.options.booming = true;
        scope.$digest();

        expect(elm.hasClass('fa')).toBe(true);
        expect(elm.hasClass('fa-envelope')).toBe(true);
        expect(elm.hasClass('fa-square')).not.toBe(true);
        expect(elm.hasClass('boom')).toBe(true);
        expect(elm.css('color')).toBe('red');

        done();
      });
    });

    describe('list', function () {});

    // describe('stacks', function () {});

    describe('ratings stars', function () {});
  });
});
