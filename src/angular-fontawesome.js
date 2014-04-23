angular.module('picardy.fontawesome', [])
	.directive('fa', function () {
		return {
			restrict: 'E',
			template: '<i class="fa"></i>',
			replace: true,
			scope: {
				border: '@',
				flip: '@',
				fw: '@',
				inverse: '@',
				name: '@',
				rotate: '@',
				size: '@',
				spin: '@',
				stack: '@'
			},
			compile: function (tElement, tAttrs, transclude) {
				return {
					pre: function preLink (scope, iElement, iAttrs, controller) {
						/* Defined attrs */
						if (!!scope.name) {
							iElement.addClass('fa-' + scope.name);
						}

						if (!!scope.rotate && !isNan(parseInt(scope.rotate, 10))) {
							iElement.addClass('fa-rotate-' + scope.rotate);
						}

						if (!!scope.flip && scope.rotate === 'horizontal' || scope.rotate === 'vertical') {
							iElement.addClass('fa-flip-' + scope.rotate);
						}

						if (!!scope.size) {
							if (scope.size === 'large') {
								iElement.addClass('fa-lg');
							} else if (!isNan(parseInt(scope.size, 10))) {
								iElement.addClass('fa-' + scope.size + 'x');
							}
						}

						/* Boolean attrs */
						if ('border' in iAttrs && scope.border !== 'false' && scope.border !== false) {
							iElement.addClass('fa-border');
						}

						if ('fw' in iAttrs && scope.fw !== 'false' && scope.fw !== false) {
							iElement.addClass('fa-fx');
						}

						if ('inverse' in iAttrs && scope.inverse !== 'false' && scope.inverse !== false) {
							iElement.addClass('fa-inverse');
						}

						if ('list' in iAttrs || (iElement.parent() &&
								iElement.parent().parent() &&
								iElement.parent().parent().hasClass('fa-ul') &&
								iElement.parent().children()[0] === iElement[0])) {
							iElement.addClass('fa-li');
						}

						if ('spin' in iAttrs && scope.spin !== 'false' && scope.spin !== false) {
							iElement.addClass('fa-spin');
						}
					}
				};
			}
		};
	});