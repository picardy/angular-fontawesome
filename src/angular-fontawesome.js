angular.module('picardy.fontawesome', [])
	.directive('fa', function () {
		return {
			restrict: 'E',
			template: '<i class="fa"></i>',
			replace: true,
			scope: {
				border: '@',
				name: '@',
				rotate: '@',
				size: '@',
				spin: '@',
				color: '@'
			},
			compile: function (tElement, tAttrs, transclude) {
				return {
					pre: function preLink (scope, iElement, iAttrs, controller) {
						/* Defined attrs */
						if (!!scope.name) {
							iElement.addClass('fa-' + scope.name);
						}

						if (!!scope.rotate) {
							if (scope.rotate === 'horizontal' || scope.rotate === 'vertical') {
								iElement.addClass('fa-flip-' + scope.rotate);
							} else if (!isNan(parseInt(scope.rotate, 10))) {
								iElement.addClass('fa-rotate-' + scope.rotate);
							}
							iElement.addClass('fa-rotate-' + scope.rotate);
						}

						if (!!scope.size) {
							if (scope.size === 'large') {
								iElement.addClass('fa-lg');
							} else if (!isNan(parseInt(scope.size, 10))) {
								iElement.addClass('fa-' + scope.size + 'x');
							}
							iElement.addClass('fa-rotate-' + scope.rotate);
						}

						if (!!scope.color) {
							iElement.css('color', scope.color);
						}

						/* Boolean attrs */
						if ('border' in iAttrs) {
							iElement.addClass('fa-border');
						}

						if ('spin' in iAttrs) {
							iElement.addClass('fa-spin');
						}

						if ('list' in iAttrs || (iElement.parent() &&
								iElement.parent().parent() &&
								iElement.parent().parent().hasClass('fa-ul') &&
								iElement.parent().children()[0] === iElement[0])) {
							iElement.addClass('fa-li');
						}
					}
				};
			}
		};
	});