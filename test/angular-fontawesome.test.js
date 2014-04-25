describe('angular-fontawesome', function () {
  beforeEach(module('picardy.fontawesome'));

  afterEach(inject(function ($rootScope) {
    delete $rootScope.options;
  }));

  describe('constructor', function () {
    var elm, scope;

    beforeEach(inject(function ($rootScope, $compile) {
      elm = angular.element('<fa></fa>');
      scope = $rootScope;
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

      beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element('<fa name="{{ options.name }}"></fa>');
        scope = $rootScope;
        $compile(elm)(scope);

        $rootScope.options = $rootScope.options || {};
        $rootScope.options.name = 'square';
        $rootScope.$digest();
      }));

      it('should replace the <fa> tag with an <i> tag that contains the proper classes', function () {
        expect(elm.hasClass('fa-square')).toBe(true);
      });

      it('should be able to change the used icon during the $digest cycle', function () {
        scope.options.name = 'book';
        scope.$digest();

        expect(elm.hasClass('fa-square')).not.toBe(true);
        expect(elm.hasClass('fa-book')).toBe(true);
      });
    });

    describe('size', function () {
      beforeEach(inject(function($rootScope, $compile) {
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
        for(i=0; i<100; i++) {
          scope.options.size = i;
          scope.$digest();

          expect(elm.hasClass('fa-' + i + 'x')).toBe(true);
          expect(elm.hasClass('fa-' + (i - 1) + 'x')).not.toBe(true);
        }
      });
    });

    describe('flip', function () {
      beforeEach(inject(function($rootScope, $compile) {
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

      beforeEach(inject(function($rootScope, $compile) {
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
  });

  describe('boolean attributes', function () {
    describe('spin', function () {
      it('should set the class if the attr is present with no value', function () {
        var elm, scope;

        inject(function($rootScope, $compile) {
          elm = angular.element('<fa name="loading" spin></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();
        });

        runs(function () {
          expect(elm.hasClass('fa-spin')).toBe(true);
        });
      });

      it('should be set to false if it\'s declared', function () {
        var elm, scope;

        inject(function($rootScope, $compile) {
          elm = angular.element('<fa name="loading" spin="false"></fa>');
          scope = $rootScope;
          $compile(elm)(scope);
          scope.$digest();
        });

        runs(function () {
          expect(elm.hasClass('fa-spin')).toBe(false);
        });
      });

      it('should bind to an expression', function () {
        var elm, scope;

        inject(function($rootScope, $compile) {
          elm = angular.element('<fa name="loading" spin="{{ options.loading }}"></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();
        });

        runs(function () {
          scope.options.loading = true;
          scope.$digest();
          expect(elm.hasClass('fa-spin')).toBe(true);

          scope.options.loading = false;
          scope.$digest();
          expect(elm.hasClass('fa-spin')).toBe(false);
        });
      });
    });

    describe('border', function () {
      it('should set the class if the attr is present with no value', function () {
        var elm, scope;

        inject(function($rootScope, $compile) {
          elm = angular.element('<fa name="loading" border></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();
        });

        runs(function () {
          expect(elm.hasClass('fa-border')).toBe(true);
        });
      });

      it('should be set to false if it\'s declared', function () {
        var elm, scope;

        inject(function($rootScope, $compile) {
          elm = angular.element('<fa name="loading" border="false"></fa>');
          scope = $rootScope;
          $compile(elm)(scope);
          scope.$digest();
        });

        runs(function () {
          expect(elm.hasClass('fa-border')).toBe(false);
        });
      });

      it('should bind to an expression', function () {
        var elm, scope;

        inject(function($rootScope, $compile) {
          elm = angular.element('<fa name="loading" border="{{ options.border }}"></fa>');
          scope = $rootScope;

          $rootScope.options = $rootScope.options || {};

          $compile(elm)(scope);
          scope.$digest();
        });

        runs(function () {
          scope.options.border = true;
          scope.$digest();
          expect(elm.hasClass('fa-border')).toBe(true);

          scope.options.border = false;
          scope.$digest();
          expect(elm.hasClass('fa-border')).toBe(false);
        });
      });
    });
    describe('fw', function () {});
    describe('inverse', function () {});
  });

  describe('conditional attributes', function () {
    describe('list', function () {});

    // describe('stacks', function () {});

    describe('ratings stars', function () {});
  });

  describe('demo tests', function () {
    it('should handle normal directives, such as ng-class', function () {
      var elm, scope;

      inject(function ($rootScope, $compile) {
        elm = angular.element('<fa name="{{ options.name }}" ng-class="{\'boom\': options.booming}" ng-style="{\'color\': options.color}"></fa>');
        scope = $rootScope;
        $compile(elm)($rootScope);
        $rootScope.$digest();
      });

      runs(function () {
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
      });
    });

    describe('list', function () {});

    // describe('stacks', function () {});

    describe('ratings stars', function () {});
  });
});