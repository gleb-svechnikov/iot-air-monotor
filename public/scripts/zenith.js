angular.module('zenith', [
    /* Components */
    'zenith.accordion',
    'zenith.calendar',
    'zenith.charges',
    'zenith.datepicker',
    'zenith.daterange',
    'zenith.feedback',
    'zenith.filterButtons',
    'zenith.filterButtonsItem',
    'zenith.modal',
    'zenith.notification',
    'zenith.pagination',
    'zenith.passwordMeter',
    'zenith.progress',
    'zenith.searchbox',
    'zenith.select',
    'zenith.slidePanel',
    'zenith.spinner',
    'zenith.th',
    'zenith.tooltip',
    'zenith.tabset',
    'zenith.validation',
    'zenith.tourSlider',
    'zenith.audioplayer',


    /* Directives */
    'zenith.bindHtmlUnsafe',
    'zenith.dateFormat',
    'zenith.dropdown',
    'zenith.thead',
    'zenith.validateField',
    'zenith.validateFile',
    'zenith.validateForm',
    'zenith.filters',
    'zenith.customFilter',

    /* Filters */
    'zenith.start',
    'zenith.customFilter',

    /* Services */
    'zenith.clientDataSource',
    'zenith.position',
    'zenith.serverDataSource',
    'zenith.passwordPolicy',
    'zenith.passwordStrength',
    'zenith.passwordGenerator'

]);
angular.module('zenith').constant("templateConstants", {
    accordion: '/zenith/src/components/accordion/accordion.template.html',
    calendar: '/zenith/src/components/calendar/calendar.template.html',
    charges: '/zenith/src/components/charges/charges.template.html',
    confirmation: '/zenith/src/components/confirmation/confirmation.template.html',
    datepicker: '/zenith/src/components/datepicker/datepicker.template.html',
    daterange: '/zenith/src/components/daterange/daterange.template.html',
    feedback: '/zenith/src/components/feedback/feedback.template.html',
    filterButtons: '/zenith/src/components/filter-buttons/filterbuttons.template.html',
    filterButtonsItem: '/zenith/src/components/filter-buttons-item/filter-buttons-item.template.html',
    modal: '/zenith/src/components/modal/modal.template.html',
    notification: '/zenith/src/components/notification/notification.template.html',
    pagination: '/zenith/src/components/pagination/pagination.template.html',
    passwordMeter: '/zenith/src/components/password-meter/password-meter.template.html',
    progress: '/zenith/src/components/progress/progress.template.html',
    select: '/zenith/src/components/select/select.template.html',
    slidePanel: '/zenith/src/components/slide-panel/slide-panel.template.html',
    spinner: '/zenith/src/components/spinner/spinner.template.html',
    tabset: '/zenith/src/components/tabset/tabset.template.html',
    tab: '/zenith/src/components/tabset/tab.template.html',
    th: '/zenith/src/components/th/th.template.html',
    validation: '/zenith/src/components/validation/validation.template.html',
});

/**
 * @ngdoc directive
 * @name zenith.accordion:zAccordion
 * @element z-accordion
 * @param {expression} show Show accordion content
 * @param {string} title Accordion title
 * @restrict E
 * @description
 * Creates UI element for accordion.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <z-accordion title="Accordion title" show="show">
 Accordion content
 </z-accordion>
 </file>
 </example>
*/

(function () {
    angular.module('zenith.accordion', [])
        .directive('zAccordion', zAccordion);
    zAccordion.$inject = ['templateConstants'];
    function zAccordion(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                show: '=?',
                title: '@?'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.accordion,
            controller: AccordionController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

    AccordionController.$inject = ['$scope', '$element', '$attrs'];
    function AccordionController($scope, $element, $attrs) {
        var ctrl = this;

        ctrl.toggleAccordion = function () {
            ctrl.show = !ctrl.show;
        };
    }

})();

(function () {
    angular.module('zenith.audioplayer',[])
        .directive('zAudioplayer', AudioplayerDirective);

    function AudioplayerDirective() {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                source: '@',
                isDark: '@?',
                showLoading: '=?',
                onError: '&'
            },
            controllerAs: 'ctrl',
            controller: AudioPlayerCtrl,
            link: linkFn,
            templateUrl: '/zenith/src/components/audioplayer/audioplayer.template.html',
            replace: true
        };

        function linkFn(scope, element, attrs) {}

        return directive;
    }

    AudioPlayerCtrl.$inject = ['$sce', '$scope', '$element', '$attrs', '$timeout', '$filter'];

    function AudioPlayerCtrl($sce, $scope, $element, $attrs, $timeout, $filter) {
        var audio  = $element.find('audio')[0],
            duration,
            ctrl = this;

        $scope.$watch('source', function (source ,oldSource) {
            if (!source && !oldSource) { return; }

            ctrl.isLoaded = false;
            ctrl.isPlaying = false;
            ctrl.hasError = false;
            ctrl.currentTimeFormatted = '';
            ctrl.playPercent = 0;

            audio.pause;
            audio.src = source;
            audio.load();
        });

        ctrl.playPercent = 0;
        ctrl.isPlaying = false;

        audio.volume = 0.5;
        ctrl.volumePercent = audio.volume * 100;
        ctrl.currentTimeFormatted = '';

        ctrl.hasError = false;
        ctrl.errorMessage = '';

        ctrl.api = {
            savedVolume: null,
            play: function () {
                audio.play();
                ctrl.isPlaying = true;
            },

            pause: function () {
                audio.pause();
                ctrl.isPlaying = false;
            },

            refreshVolume: function (e) {
                ctrl.volumePercent = 100 * e.offsetX / e.currentTarget.offsetWidth;
                audio.volume = ctrl.volumePercent / 100;
            },

            refreshTrackPosition: function (e) {
                ctrl.playPercent = 100 * e.offsetX / e.currentTarget.offsetWidth;
                audio.currentTime = parseFloat(duration * ctrl.playPercent / 100, 2);
            },

            mute: function () {
                this.savedVolume = audio.volume;
                ctrl.volumePercent = 0;;
                audio.volume = 0;
            },
            unmute: function () {
                audio.volume = this.savedVolume || 0.5;
                ctrl.volumePercent = 100 * audio.volume;
            }
        };

        var getTimeFormatted = function (timeInSecs) {
            var SECS_IN_MIN = 60,
                seconds = Math.floor(timeInSecs % SECS_IN_MIN),
                minutes = Math.floor(timeInSecs / SECS_IN_MIN);

            if (seconds < 10) { seconds = '0' + seconds;}


            return (ctrl.playPercent ? '-' : '') + minutes + ':' + seconds;
        };

        ctrl.isLoaded = false;

        var audioCallbacks = {
            init: function () {
                duration = audio.duration;
                ctrl.isPlaying = false;
                ctrl.isLoaded = true;
                ctrl.hasError = false;
                ctrl.currentTimeFormatted = getTimeFormatted(duration);
                audioCallbacks.refreshProgress();
                $scope.$apply();
            },

            refreshProgress: function () {
                ctrl.playPercent = 100 * (audio.currentTime / audio.duration);
                ctrl.currentTimeFormatted = getTimeFormatted(audio.duration - audio.currentTime);

                if (audio.currentTime === duration) {
                    ctrl.playPercent = 0;
                    ctrl.isPlaying = false;
                    ctrl.currentTimeFormatted = getTimeFormatted(audio.duration);
                }


                $scope.$apply();
            },
            failed: function (e) {
                var AudioErrors = {};
                AudioErrors[e.target.error.MEDIA_ERR_ABORTED]           = 'You aborted the video playback.';
                AudioErrors[e.target.error.MEDIA_ERR_NETWORK]           = 'A network error caused the audio download to fail.';
                AudioErrors[e.target.error.MEDIA_ERR_DECODE]            = 'The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.';
                AudioErrors[e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED] = 'The audio not be loaded, either because the server or network failed or because the format is not supported.';

                ctrl.errorMessage = AudioErrors[e.target.error.code] || 'An unknown error occurred.';
                ctrl.hasError = true;
                $scope.onError({'errorType': e.target.error});
                $scope.$apply();
            }
        };

        audio.addEventListener('loadedmetadata', audioCallbacks.init);
        audio.addEventListener('timeupdate',     audioCallbacks.refreshProgress, false);
        audio.addEventListener('error',          audioCallbacks.failed, true);
    }
})();
/**
 * @ngdoc directive
 * @name zenith.calendar:zCalendar
 * @element z-calendar
 * @param {expression} max-date Max calendar date
 * @param {expression} min-date Min calendar date
 * @param {expression} ngModel Active date
 * @restrict E
 * @description
 * Creates UI element for accordion.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-calendar ng-model="date"></z-calendar>
 {{ date | date }}
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.calendar', [])
        .constant('MONTH_NAMES', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        .directive('zCalendar', zCalendar);
    zCalendar.$inject = ['templateConstants'];
    function zCalendar(templateConstants) {
        var directive = {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                maxDate: '=?',
                minDate: '=?',
                ngModel: '='
            },
            replace: true,
            transclude: {
                block: '?additionalBlock'
            },
            templateUrl: templateConstants.calendar,
            controller: CalendarController,
            controllerAs: 'ctrl',
            link: link,
            bindToController: true
        };
        CalendarController.$inject = ['$scope', '$element', '$attrs', 'MONTH_NAMES'];
        function CalendarController($scope, $element, $attrs, MONTH_NAMES) {
            var ctrl = this;
            var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            ctrl.moveMonth = moveMonth;
            ctrl.disableButton = disableButton;
            ctrl.selectDate = selectDate;
            ctrl.isActiveDate = isActiveDate;
            ctrl.isToday = isToday;
            ctrl.isDisabledDate = isDisabledDate;
            ctrl.rows = [];

            function init() {
                var tempDate = new Date();
                if (angular.isDate(ctrl.ngModel)) {
                    tempDate = ctrl.ngModel;
                }
                if (!angular.isDefined(ctrl.maxDate)) {
                    var temp = new Date();
                    ctrl.maxDate = new Date(temp.getFullYear() + 20, temp.getMonth(), temp.getDate());
                }
                if (!angular.isDefined(ctrl.minDate)) {
                    ctrl.minDate = new Date(0);
                }
                var year = tempDate.getFullYear(),
                    month = tempDate.getMonth(),
                    firstDayOfMonth = new Date(year, month),
                    lastDayOfMonth = new Date(year, month, getDaysInMonth(year, month)),
                    firstDate = new Date(firstDayOfMonth),
                    difference = 0 - firstDayOfMonth.getDay(),
                    numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference;
                if (compare(lastDayOfMonth, ctrl.minDate) >= 0 && compare(firstDayOfMonth, ctrl.maxDate) <= 0) {
                    ctrl.displayMonthDate = angular.copy(tempDate);
                } else {
                    ctrl.displayMonthDate = angular.copy(ctrl.maxDate);
                }
                ctrl.availableYears = getAvailableYears();
                ctrl.availableMonth = getAvailableMonthList();

                if (numDisplayedFromPreviousMonth > 0) {
                    firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                }
                if (angular.isDate(ctrl.ngModel)) {
                    ctrl.activeDate = ctrl.ngModel;
                } else {
                    ctrl.activeDate = null;
                }
            }

            function getDaysInMonth(year, month) {
                return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
            }

            function getAvailableYears() {
                var startYear = ctrl.minDate.getFullYear();
                var endYear = ctrl.maxDate.getFullYear();
                if (startYear != endYear) {
                    var years = [];
                    for (var i = startYear; i <= endYear; i++) {
                        years.push(i);
                    }
                    return years;
                }
                else {
                    return [startYear];
                }
            }

            function getAvailableMonthList() {
                var monthList = [];
                var year = ctrl.displayMonthDate.getFullYear();
                for (var i = 0; i < 12; i++) {
                    var firstDayOfMonth = new Date(year, i);
                    var lastDayOfMonth = new Date(year, i, getDaysInMonth(year, i));
                    if (compare(lastDayOfMonth, ctrl.minDate) >= 0 && compare(firstDayOfMonth, ctrl.maxDate) <= 0) {
                        monthList.push(MONTH_NAMES[i]);
                    }
                }
                return monthList;
            }

            function getDates(startDate, n, prevMonthDiff) {
                var dates = new Array(n + prevMonthDiff),
                    current = new Date(startDate),
                    i = 0;
                current.setHours(12); // Prevent repeated dates because of timezone bug

                while (i < n + prevMonthDiff) {
                    if (i < prevMonthDiff) {
                        dates[i++] = null;
                    } else {
                        dates[i++] = new Date(current);
                        current.setDate(current.getDate() + 1);
                    }
                }
                return dates;
            }

            function split(arr, size) {
                var arrays = [];
                while (arr.length > 0) {
                    arrays.push(arr.splice(0, size));
                }
                return arrays;
            }

            function moveMonth(direction) {
                var year = ctrl.displayMonthDate.getFullYear(),
                    month = ctrl.displayMonthDate.getMonth() + direction;
                ctrl.displayMonthDate.setFullYear(year, month, 1);
                refreshView();
            }

            function disableButton(direction) {
                var year = ctrl.displayMonthDate.getFullYear(),
                    month = ctrl.displayMonthDate.getMonth() + direction;
                if (direction == -1) {
                    var maxDateOfPrevMonth = new Date(year, month, getDaysInMonth(year, month));
                    return compare(maxDateOfPrevMonth, ctrl.minDate) < 0;
                } else {
                    var minDateOfNextMonth = new Date(year, month);
                    return compare(minDateOfNextMonth, ctrl.maxDate) > 0;
                }

            }

            function refreshView() {
                var year = ctrl.displayMonthDate.getFullYear(),
                    month = ctrl.displayMonthDate.getMonth(),
                    firstDayOfMonth = new Date(year, month, 1),
                    difference = -firstDayOfMonth.getDay(),
                    numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
                    firstDate = new Date(firstDayOfMonth);

                var days = getDates(firstDate, getDaysInMonth(year, month), numDisplayedFromPreviousMonth);
                ctrl.availableMonth = getAvailableMonthList();
                if (ctrl.availableMonth.indexOf(MONTH_NAMES[month]) !== -1) {
                    ctrl.selectedMonth = MONTH_NAMES[month];
                } else {
                    if (MONTH_NAMES.indexOf(ctrl.selectedMonth) > MONTH_NAMES.indexOf(ctrl.availableMonth[ctrl.availableMonth.length - 1])) {
                        ctrl.selectedMonth = ctrl.availableMonth[ctrl.availableMonth.length - 1];
                    } else {
                        ctrl.selectedMonth = ctrl.availableMonth[0];
                    }
                }
                ctrl.selectedYear = year.toString();
                ctrl.rows = split(days, 7);
            }

            function selectDate(date) {
                ctrl.activeDate = date;
                ctrl.setModelValue(date);
            }

            function isActiveDate(date) {
                return compare(date, ctrl.activeDate) === 0;
            }
            function isToday(date) {
                return compare(date, new Date()) === 0;
            }

            function isDisabledDate(date) {
                var isDateDisabled = true;
                if (angular.isDefined(ctrl.minDate)) {
                    if (compare(date, ctrl.minDate) < 0) {
                        isDateDisabled = false;
                    }
                }
                if (angular.isDefined(ctrl.maxDate)) {
                    if (compare(date, ctrl.maxDate) > 0) {
                        isDateDisabled = false;
                    }
                }

                return isDateDisabled;
            }

            function compare(date1, date2) {
                if (angular.isDate(date1) && angular.isDate(date2)) {
                    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) );
                }

            }


            init();
            refreshView();

            $scope.$watch('ctrl.selectedYear', function (nv, ov) {
                if (nv && !angular.equals(nv, ov)) {
                    var year = parseInt(nv),
                        month = ctrl.displayMonthDate.getMonth();
                    ctrl.displayMonthDate.setFullYear(year, month, 1);
                    refreshView();
                }
            });
            $scope.$watch('ctrl.selectedMonth', function (nv, ov) {
                if (nv && !angular.equals(nv, ov)) {
                    var year = ctrl.displayMonthDate.getFullYear();
                    var month = MONTH_NAMES.indexOf(nv);
                    ctrl.displayMonthDate.setFullYear(year, month, 1);
                    refreshView();
                }
            });
            $scope.$watch('ctrl.ngModel', function (newValue) {
                if (newValue) {
                    ctrl.activeDate = newValue;
                    refreshView();
                }
            });
            $scope.$watch('ctrl.maxDate', function (newValue) {
                if (newValue) {
                    ctrl.activeDate = newValue;
                    refreshView();
                }
            });
            $scope.$watch('ctrl.minDate', function (newValue) {
                if (newValue) {
                    ctrl.activeDate = newValue;
                    refreshView();
                }
            });

        }

        function link(scope, element, attrs, ngModel) {
            scope.ctrl.setModelValue = function (value) {
                ngModel.$setViewValue(value);
            };
            //
            // element.bind('click', function (event) {
            //     event.stopPropagation();
            // });
        }

        return directive;
    }


})();

/**
 * @ngdoc directive
 * @name zenith.charges:zCharges
 * @element z-charges
 * @param {object} data Charges information object

 * @restrict E
 * @description
 * Charges element
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-charges data="chargeInfo"></z-charges>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.charges', [])
        .directive('zCharges', zCharges);
    zCharges.$inject = ['templateConstants'];
    function zCharges(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                data: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.charges,
            controller: ChargesController,
            controllerAs: 'ctrl',
            link: link,
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs) {

        }

    }

    function ChargesController($scope, $element, $attrs) {
        var ctrl = this;

        function checkdata(data) {
            // Calling confirm function if there are no wordings and charges
            if (data) {
                if (data.topWordings === null) {
                    data.topWordings = [];
                }
                if (data.bottomWordings === null) {
                    data.bottomWordings = [];
                }
                if (data.bottomWordings.length == 0 && data.IsChargeEmpty && !data.ShowPricingPageHiddenWording && !data.ShowPartnerAmountPositiveWording) {
                    ctrl.confirmCallback({ charge: ctrl.charge });
                }
            }
        }

        ctrl.charge = true;
        checkdata(ctrl.data);

        ctrl.confirmCharge = function () {
            ctrl.confirmCallback({ charge: ctrl.charge });
        };
        ctrl.cancelCharge = function () {
            ctrl.cancelCallback();
        };

        $scope.$watch('ctrl.data', function (newValue) {
            checkdata(newValue);
        });

    }

})();

/**
 * @ngdoc directive
 * @name zenith.check-all:zCheckAll
 * @element z-check-all
 * @param {object} data data object

 * @restrict E
 * @description
 * Check all element
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-check-all data="somedata"></z-charges>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.check-all',[])
        .directive('zCheckAll', [function () {
            return {
                restrict: 'E',
                scope: {
                    data: '=',
                    selectField: '@',
                    filterExpression: '=',
                    filterFunction: '=',
                    onChange: '&',
                    state: '=?'
                },
                replace: true,
                template: '<input type="checkbox" ng-model="state" ng-change="toggleCheckAll()" />',
                controller: ['$scope', '$filter', function ($scope, $filter) {

                    $scope.toggleCheckAll = function () {
                        angular.forEach($scope.getAvailableItems(), function (item) {
                            item[$scope.selectField] = $scope.state;
                        });

                        if (angular.isDefined($scope.onChange)) {
                            $scope.onChange();
                        }
                    };

                    $scope.$watchCollection('[data.start, data.limit, data.search, data.sortKey, data.sortDesc]',
                        function () {
                            $scope.state = $scope.allCurrentPageSelected();
                        });

                    $scope.$watch('data.currentPage', function () {
                            $scope.state = $scope.allCurrentPageSelected();
                        },
                        true);


                    $scope.allCurrentPageSelected = function () {
                        if ($scope.data && $scope.data.currentPage) {

                            var selectedItems = $filter('filter')($scope.data.currentPage, function (item) {
                                return item[$scope.selectField];
                            });

                            if (selectedItems.length) {
                                return selectedItems.length === $scope.getAvailableItems().length;
                            }
                        }

                        return false;
                    };

                    $scope.getAvailableItems = function () {

                        var result = $scope.data.currentPage;

                        if (angular.isDefined($scope.filterExpression)) {
                            result = $filter('filter')(result, $scope.filterExpression);
                        }

                        if (angular.isDefined($scope.filterFunction)) {
                            result = $filter('filter')(result, function (item) {
                                return $scope.filterFunction(item);
                            });
                        }

                        return result;
                    }
                }]
            }
        }]);
})();

/**
 * @ngdoc directive
 * @name zenith.confirmation:zConfirmation
 * @element z-confirmation
 * @param {boolean} state - if true shows confirmation
 * @param {function} confirmCallback - confirm callback
 * @param {function} cancelCallback - cancel callback
 * @param {boolean} isInTable - if true sets special styles for confirmation in a table
 * @restrict E
 * @description
 * Confirmation element
 *
 * @example
 <example module="example">
     <file name="index.html">
         <div ng-controller="exampleController">
            <z-confirmation state="showConfirmation"
                confirm-callback="confirmCallback"
                cancel-callback="cancelCallback"
                is-in-table="isInTable">
                Confirmation content
            </z-confirmation>
         </div>
     </file>
 </example>
 */

 (function() {
     angular.module('zenith.confirmation', [])
        .directive('zConfirmation', zConfirmation);
     zConfirmation.$inject = ['templateConstants'];
     function zConfirmation(templateConstants) {
            var directive = {
                restrict: 'E',
                scope: {
                    state: '=',
                    confirmCallback: '&',
                    cancelCallback: '&',
                    isInTable: '='
                },
                replace: true,
                transclude: true,
                templateUrl: templateConstants.confirmation,
                controller: ConfirmationController,
                controllerAs: 'ctrl',
                bindToController: true
            };

            return directive;
        }

        ConfirmationController.$inject = ['$scope', '$element', '$attrs'];
        function ConfirmationController($scope, $element, $attrs) {
            var ctrl = this;
        }
 })();

/**
 * @ngdoc directive
 * @name zenith.datepicker:zDatepicker
 * @element z-datepicker
 * @param {string} format Date format
 * @param {expression} max-date Max calendar date
 * @param {expression} min-date Min calendar date
 * @param {expression} ngModel Active date
 * @restrict E
 * @description
 * Text input with datepicker
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-datepicker ng-model="date"></z-datepicker>
 </date>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.datepicker', ['zenith.calendar', 'zenith.dateFormat'])
        .directive('zDatepicker', zDatepicker);
    zDatepicker.$inject = ['templateConstants'];
    function zDatepicker(templateConstants) {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                format: '@?',
                maxDate: '=?',
                minDate: '=?',
                isDisabled: '=?',
                name: '@?',
                errors: '=?'
            },
            replace: true,
            transclude: {
                block: '?additionalBlock'
            },
            templateUrl: templateConstants.datepicker,
            controller: DatepickerController,
            controllerAs: 'ctrl',
            bindToController: true
        };
    };
    DatepickerController.$inject = ['$scope', '$element', '$attrs', '$document'];
    function DatepickerController($scope, $element, $attrs, $document) {
        var ctrl = this;
        ctrl.calendarData = {
            isCalendarVisible: false,
            date: ctrl.ngModel
        };
        if (!angular.isDefined(ctrl.format)) {
            ctrl.format = 'MMM dd yyyy';
        }
        ctrl.showCalendar = function () {
            if (!ctrl.isDisabled) {
                ctrl.calendarData.isCalendarVisible = true;
            }
        };
        $scope.$watch('ctrl.ngModel', function (newDate, oldDate) {
            //TODO: some parser for input data.
            // if (!angular.isDate(newDate))
            //     if (!isNaN(Date.parse(newDate))) {
            //         ctrl.ngModel = new Date(newDate);
            //     }
            // }

            ctrl.calendarData.isCalendarVisible = false;
        });
        $element.find('input').bind('focus', function (event) {
            ctrl.showCalendar();
        });
        var onClick = function (event) {
            var isChild = $($element).has(event.target).length > 0;
            var isSelf = $element[0] == event.target;
            var isInside = isChild || isSelf;
            if (!isInside) {
                $scope.$apply(ctrl.calendarData.isCalendarVisible = false);
            }
        };
        $scope.$watch('ctrl.calendarData.isCalendarVisible', function (newValue, oldValue) {
            if (newValue !== oldValue && newValue == true) {
                $document.bind('click', onClick);
            } else if (newValue !== oldValue && newValue == false) {
                $document.unbind('click', onClick);
            }
        });

    }
})
();

/**
 * @ngdoc directive
 * @name zenith.daterange:zDaterange
 * @element z-daterange
 * @param {string} format Date format
 * @param {date} fromDate From date
 * @param {expression} min-date Min calendar date
 * @param {expression} ngModel Active date
 * @param {date} toDate To date
 * @restrict E
 * @description
 * Two datepickers
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-daterange ng-model="date"></z-daterange>
 </date>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.daterange', ['zenith.datepicker'])
        .directive('zDaterange', zDaterange);
    zDaterange.$inject = ['templateConstants'];
    function zDaterange(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                fromDate: '=',
                format: '@?',
                toDate: '=',
                maxDate: '=?',
                minDate: '=?'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.daterange,
            controller: DaterangeController,
            controllerAs: 'ctrl',
            bindToController: true
        };
        DaterangeController.$inject = ['$scope', '$element', '$attrs'];
        function DaterangeController($scope, $element, $attrs) {
            var ctrl = this;
        }
        return directive;
    }
})();
/**
 * @ngdoc directive
 * @name zenith.feedback:zFeedback
 * @element z-feedback
 * @param {expression} show Show feedback content
 * @param {string} title Feedback title
 * @restrict E
 * @description
 * Creates UI element for feedback.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <z:feedback title="Feedback title" path="/aspx/Feedback.asmx/SendFeedback" feedback="HPFeedback"></z:feedback>
 </file>
 </example>

 */


(function () {
    angular.module('zenith.feedback', [])
        .directive('zFeedback', zFeedback);
    zFeedback.$inject = ['templateConstants'];
    function zFeedback(templateConstants) {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                title: "@",
                path: "@",
                feedback: "@"
            },
            controller: FeedbackController,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: templateConstants.feedback,
            replace: true
        };
        return directive;
    }
    FeedbackController.$inject = ['$http', '$timeout'];
    function FeedbackController($scope, $http, $timeout) {
        var ctrl = this;

        ctrl.active = {
            state: false,
            error: false,
            loading: false
        }
        $scope.$watch('ctrl.active.state', function (nv, ov) {
            if (!angular.equals(nv, ov)) angular.element('.feedback-content').slideToggle('fast').toggleClass('s-active');
        })
        ctrl.sendFeedback = function () {
            angular.element('.feedback-form').hide();
            ctrl.active.loading = true;
            ctrl.path = ctrl.path || '/aspx/Feedback.asmx/SendFeedback';
            ctrl.feedback = ctrl.feedback || 'HPFeedback';
            $http.post(ctrl.path, { subject: ctrl.title, message: ctrl.message, feedbackSource: ctrl.feedback })
                .success(function (data, status, headers, config) {
                    ctrl.data = data;
                    ctrl.active.loading = false;
                    angular.element('.feedback-greeting').show();
                }).error(function (data, status, headers, config) {
                    ctrl.status = status;
                    ctrl.active.error = true;
                    ctrl.active.loading = false;
                    angular.element('.feedback-error').show();
                });
        }
        ctrl.close = function () {
            ctrl.active.state = false;
            $timeout(function () {
                angular.element('.feedback-error').hide();
                angular.element('.feedback-greeting').hide();
                angular.element('.feedback-form').show();
            }, 500)
        }
    }

})();

/**
 * @ngdoc directive
 * @name zenith.filterButtonsItem:zFilterButtonsItem
 * @element z-filter-buttons-item
 * @param {string} value Value for filter object key
 * @restrict E
 * @description
 * Filter button
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <div class="mb16">Filter object: {{ filter }}</div>
 <z-filter-buttons filter="filter" key="isActive">
 <z-filter-buttons-item>All</z-filter-buttons-item>
 <z-filter-buttons-item value="true">Active</z-filter-buttons-item>
 <z-filter-buttons-item value="false">Inactive</z-filter-buttons-item>
 </z-filter-buttons>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.filterButtonsItem', ['zenith.filterButtons'])
        .directive('zFilterButtonsItem', zFilterButtonsItem);
    zFilterButtonsItem.$inject = ['templateConstants'];
    function zFilterButtonsItem(templateConstants) {
        var directive = {
            restrict: 'E',
            require: '^zFilterButtons',
            scope: {
                value: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.filterButtonsItem,
            controller: FilterButtonsItemController,
            controllerAs: 'ctrl',
            bindToController: true,
            link: link
        };

        return directive;

        function FilterButtonsItemController() {

        }

        function link(scope, element, attrs, filterButtonsController) {
            scope.ctrl.setFilter = function () {
                filterButtonsController.setFilter(scope.ctrl.value)
            };
            scope.ctrl.isActiveAccount = function () {
                return filterButtonsController.isActiveAccount(scope.ctrl.value);
            };
        }
    }
})();
/**
 * @ngdoc directive
 * @name zenith.filterButtons:zFilterButtons
 * @element z-filter-buttons
 * @param {expression} filter Filter object
 * @param {string} key Object key
 * @restrict E
 * @description
 * Set of filter buttons
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <div class="mb16">Filter object: {{ filter }}</div>
 <z-filter-buttons filter="filter" key="isActive">
     <z-filter-buttons-item>All</z-filter-buttons-item>
     <z-filter-buttons-item value="true">Active</z-filter-buttons-item>
     <z-filter-buttons-item value="false">Inactive</z-filter-buttons-item>
 </z-filter-buttons>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.filterButtons', [])
        .directive('zFilterButtons', zFilterButtons);
    zFilterButtons.$inject = ['templateConstants'];
    function zFilterButtons(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                filter: '=',
                key: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.filterButtons,
            controller: FilterButtonsController,
            controllerAs: 'ctrl',
            bindToController: true,
            link: link
        };

        return directive;

        function FilterButtonsController() {
            var ctrl = this;

            ctrl.setFilter = setFilter;
            ctrl.isActiveAccount = isActiveAccount;

            function setFilter(value) {
                if (!angular.isObject(ctrl.filter)) {
                    ctrl.filter = {};
                }

                ctrl.filter[ctrl.key] = value;
            }

            function isActiveAccount(value) {
                if (angular.isObject(ctrl.filter) && ctrl.filter[ctrl.key]) {
                    return ctrl.filter[ctrl.key] == value;
                } else {
                    return !value;
                }
            }

        }

        function link(scope, element, attrs) {

        }
    }
})();
/**
 * @ngdoc directive
 * @name zenith.modal:zModal
 * @element z-modal
 * @restrict E
 * @scope
 * @param {expression} is-active Is modal active
 * @param {string} title Modal title (optional)
 * @param {bool} clickoutside Close modal on outside click (optional)
 * @param {string} bodyclass Add class to modal body (optional)
 * @param {string} headerclass Add class to modal header (optional)
 * @param {function} positionTop Distance from the top of the page (optional)
 * @param {function} onClose Some action on modal close (optional)
 *
 * @description
 * Modal dialog. Allow nested modals.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
    <button class="btn m-blue" ng-click="ctrl.isActive = true">Show modal</button>
    <z-modal is-active="ctrl.isActive" title="Modal example">
        <p>Modal content</p>
        <button class="btn" ng-click="ctrl.isActive = false">Close modal</button>
    </z-modal>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.modal', [])
        .directive('zModal', zModal);
    zModal.$inject = ['templateConstants'];
    function zModal(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                isActive: '=?',
                title: '@?',
                clickoutside: '@?',
                bodyclass: '@?',
                headerclass: '@?',
                positionTop: '@?',
                onClose: '&'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.modal,
            controller: ModalController,
            controllerAs: 'ctrl',
            link: link,
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs) {
            element.removeAttr('title');
        }

    }
    ModalController.$inject = ['$scope', '$element', '$attrs'];
    function ModalController($scope, $element, $attrs) {
        var ctrl = this;

        $element.removeAttr('title');
        ctrl.isActive = angular.isDefined(ctrl.isActive) ? ctrl.isActive : false;

        ctrl.clickoutsideHandler = clickoutsideHandler;
        ctrl.close = close;

        function clickoutsideHandler() {
            if (ctrl.clickoutside === "true") {
                ctrl.isActive = !ctrl.isActive;
                ctrl.onClose();
            }
            return ctrl.isActive;
        };
        function close() {
            ctrl.isActive = false;
            ctrl.onClose();
        };

        //need for dinamic title
        $scope.$watch('isActive', function (newState) {
            $element.removeAttr('title');
        });
    }

})();
/**
 * @ngdoc directive
 * @name zenith.notification:zNotification
 * @element z-notification
 * @param {expression} is-active Is notification title
 * @param {string} timeout Hide notification after some time
 * @restrict E
 * @description
 * Notification
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <button class="btn m-blue" ng-click="ctrl.isActive = true">Show notification</button>
 <div class="page-notifications">
 <z-notification is-active="ctrl.isActive" timeout="3000">Notification content</z-notification>
 </div>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.notification', [])
        .directive('zNotification', zNotification);
    zNotification.$inject = ['templateConstants'];
    function zNotification(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                isActive: '=?',
                timeout: '@?'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.notification,
            controller: NotificationController,
            controllerAs: 'ctrl',
            link: link,
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs) {

        }

    }

    function NotificationController($scope, $element, $attrs, $timeout) {
        var ctrl = this;

        if (angular.isDefined(ctrl.timeout)) {
            $scope.$watch('ctrl.isActive', function (nv, ov) {
                if (nv === true) {
                    $timeout(function () {
                        ctrl.hideNotification();
                    }, ctrl.timeout);
                }
            });
        }

        ctrl.hideNotification = function () {
            ctrl.isActive = false;
        };

    }

})();
/**
 * @ngdoc directive
 * @name zenith.pagination:zPagination
 * @element z-pagination
 * @param {expression} limit Amount of items in page
 * @param {expression} limitsArray Array of limit options
 * @param {expression} maxItemsOnPage Maximum amount of items on page
 * @param {boolean} showAll Is show all option available
 * @param {expression} start First tem item index
 * @param {expression} total Total items
 * @restrict E
 * @description
 * Pagination
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-pagination total="pagination.total" start="pagination.start" limit="pagination.limit"></z-pagination>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.pagination', [])
        .directive('zPagination', zPagination);
    zPagination.$inject = ['templateConstants'];
    function zPagination(templateConstants) {
        var directive = {
            restrict: 'E',
            templateUrl: templateConstants.pagination,
            replace: true,
            scope: {
                limit: '=?',
                limitsArray: '=?',
                maxItemsOnPage: '=?',
                showAll: '@?',
                start: '=?',
                total: '=?'
            },
            controller: PaginationController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

    function PaginationController() {
        var ctrl = this;

        ctrl.limit = ctrl.limit || 10;
        ctrl.limitsArray = ctrl.limitsArray || [10, 25, 50, 100];
        ctrl.start = ctrl.start || 1;
        ctrl.showAll = ctrl.showAll === 'false' ? false : true;

        ctrl.setLimit = setLimit;
        ctrl.prevPage = prevPage;
        ctrl.nextPage = nextPage;

        function setLimit(limit) {
            ctrl.limit = limit;
            ctrl.start = 1;
        }

        function prevPage() {
            ctrl.start -= ctrl.limit;
        }

        function nextPage() {
            ctrl.start += ctrl.limit;
        }
    }
})();
/**
 * @ngdoc directive
 * @name zenith.passwordMeter:zPasswordMeter
 * @element z-password-meter
 * @param {object} options List of password restrictions with description and status
 * @param {string} data Password
 * @param {expression} valid Indicates whether password meter valid or not
 * @restrict E
 * @description
 * This component can be embeded to any form, it has several attributes that allows to control it behavior.
 * Inserting this component in custom form with different layout may require to add additional classes, like it is doen for Account contacts page.
 *
 * @example
 <example module="example">
     <file name="index.html">
        <z-password-meter options="data.options" valid="password.valid" data="password.string"></z-password-meter>
     </file>
 </example>
 */

(function() {
    angular.module('zenith.passwordMeter', [])
        .directive('zPasswordMeter', zPasswordMeter);
    zPasswordMeter.$inject = ['templateConstants'];
    function zPasswordMeter(templateConstants) {
            var directive = {
                restrict: 'E',
                scope: {
                    options: '=',
                    data: '=',
                    valid: '='
                },
                templateUrl: templateConstants.passwordMeter,
                controller: PasswordMeterController,
                controllerAs: 'ctrl',
                replace: true,
                bindToController: true
            };

            return directive;
        }

        PasswordMeterController.$inject = ['$scope', '$element', '$attrs', 'passwordPolicyService', 'passwordStrengthService'];
        function PasswordMeterController($scope, $element, $attrs, passwordPolicyService, passwordStrengthService) {
            var ctrl = this;

            ctrl.valid = false;
            ctrl.progress = { percent: 0, status: 'm-default', message: 'Password strength' };

            $scope.$watch('ctrl.data', function (n,o) {
                var passwordStrength = passwordStrengthService.getPasswordStrength(ctrl.data);

                ctrl.options = passwordPolicyService.getPasswordOptions(ctrl.data);

                switch (passwordStrength) {
                    case 1:
                        ctrl.progress.percent = 20;
                        ctrl.progress.status = 'm-danger';
                        ctrl.progress.message = 'Too weak';
                        break;
                    case 2:
                        ctrl.progress.percent = 40;
                        ctrl.progress.status = 'm-warning';
                        ctrl.progress.message = 'Weak';
                        break;
                    case 3:
                        ctrl.progress.percent = 60;
                        ctrl.progress.status = 'm-warning';
                        ctrl.progress.message = 'Fair';
                        break;
                    case 4:
                        ctrl.progress.percent = 80;
                        ctrl.progress.status = 'm-success';
                        ctrl.progress.message = 'Good';
                        break;
                    case 5:
                        ctrl.progress.percent = 100;
                        ctrl.progress.status = 'm-success';
                        ctrl.progress.message = 'Strong';
                        break;
                    default:
                        ctrl.progress.percent = 0;
                        ctrl.progress.status = 'm-default';
                        ctrl.progress.message = 'Password strength';
                        break;
                };

                ctrl.valid = (passwordStrength > 5 && passwordPolicyService.isAllPoliciesVerified());
            }
        );
    };
})();

/**
 * @ngdoc directive
 * @name zenith.progress:zProgress
 * @element z-progress
 * @param {expression} show Show progress bar
 * @param {string} title Progress title
 * @restrict E
 * @description
 * Creates UI element for progress.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <z:progress title="Feedback title" path="/aspx/Feedback.asmx/SendFeedback" feedback="HPFeedback"></z:feedback>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.progress', [])
        .directive('zProgress', zProgress);
    zProgress.$inject = ['templateConstants'];
    function zProgress(templateConstants) {
        var directive = {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                completion: '@?'
            },
            controller: ProgressController,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: templateConstants.progress,

        };
        return directive;
    }
    function ProgressController($scope) {
        var ctrl = this;
        ctrl.completion = $scope.completion;
    }

})();

/**
 * @ngdoc directive
 * @name zenith.searchbox:zSearchbox
 * @element z-searchbox
 * @param {boolean} disabled Is search disabled
 * @param {boolean} live Is search live
 * @param {string} placeholder Search input placeholder
 * @param {expression} value Search value
 * @restrict E
 * @description
 * Search input
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-searchbox value="search" placeholder="Search by name"></z-searchbox>
 </div>
 </file>
 </example>
 */
(function () {
    angular.module('zenith.searchbox', [])
        .directive('zSearchbox', zSearchbox);
    zSearchbox.$inject = ['templateConstants'];
    function zSearchbox(templateConstants) {
        var directive = {
            restrict: 'E',
            templateUrl: templateConstants.searchbox,
            replace: true,
            scope: {
                disabled: '=?',
                live: '@?',
                placeholder: '@?',
                value: '=?'
            },
            controller: SearchboxController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

    function SearchboxController() {
        var ctrl = this;

        ctrl.placeholder = ctrl.placeholder || 'Search';
        ctrl.live = angular.isUndefined(ctrl.live) ? true : ctrl.live;
        ctrl.tempValue = '';

        ctrl.setValue = setValue;
        ctrl.clearValue = clearValue;

        function setValue(value) {
            ctrl.value = value;
        }

        function clearValue() {
            ctrl.value = '';
            ctrl.tempValue = '';
        }

    }
})();
/**
 * @ngdoc directive

 * @name zenith.select:zSelect
 * @element z:select
 * @param {Array} data Array with autocomplete elements
 * @param {String} placeholder Placeholder text that nothing is selected
 * @param {Array} ngModel Selected item(s)
 * @param {Number} optionRows Number of option rows (Optional, 7 by default)
 * @param {Boolean} multiselect Enables ability to select multiple elements
 * @param {Boolean} useNgIf Use it for removing options from DOM when dropdown closed (may be useful in case of multiple z-select on one page or when content is heavy)
 * @param {string} searchFields Define what properties of object will be used in search (Optional, defaut: search in stringified object)

 * @restrict E
 * @description
 * Creates UI element for select.
 *
 * **Note:** no notes
 *
 * @example
 <example module="zenithSelect">
 <file name="index.html">
 <div ng-include="'/Zenith/dist/icons/symbol/svg/sprite.svg'" style="display: none"></div>
 <div ng-controller="selectController as ctrl" style="width: 350px;">
 <z-select data="ctrl.data" placeholder="Please select options" option-rows="5" ng-model="ctrl.input" >
 <z-option>
 <span class="fl">{{ item.name }}</span>
 <a class="fr" href="">{{ item.phone }}</a>
 </z-option>
 <z-option-exception>
 <div class="text-center muted">Nothing found</div>
 </z-option-exception>
 <z-option-button>
 <button class="btn m-link p0" type="button">Select from address book</button>
 </z-option-button>
 </z-select>
 </div>
 </file>
 <file name="script.js">
 angular.module("zenithSelect", ["zenith"])
 .controller("selectController", ["$scope", function($scope){
    var ctrl = this;
    ctrl.data = [
        {name: 'Tyrion Lannister', phone: '1-847-555-5555', symbol: 'lion'},
        {name: 'Cersei Lannister', phone: '1-847-555-5551', symbol: 'lion'},
        {name: 'Daenerys Targaryen', phone: '1-847-555-5552', symbol: 'dragon'},
        {name: 'Arya Stark', phone: '1-847-555-5552', symbol: 'wolf'},
        {name: 'Jon Snow', phone: '1-847-555-5552', symbol: 'wolf'},
        {name: 'Sansa Stark', phone: '1-847-555-5552', symbol: 'wolf'},
        {name: 'Jorah Mormont', phone: '1-847-555-5552', symbol: '?'},
        {name: 'Jaime Lannister', phone: '1-847-555-5552', symbol: 'lion'},
        {name: 'Sandor Clegane', phone: '1-847-555-5552', symbol: 'dog'},
        {name: 'Theon Greyjoy', phone: '1-847-555-5552', symbol: 'sea'},
    ];
    console.log(ctrl.data);
    ctrl.input = [
        {name: 'Sansa Stark', phone: '1-847-555-5552', symbol: 'wolf'},
    ];
    ctrl.multiple = true;
}]);
 </file>
 </example>

 *@doc example
 <doc:source module="z">
 <script></script> <!-- Contents will be extracted into a script.js file -->
 <style></style> <!-- Contents will be extracted into a style.css file -->
 </doc:source>
 <doc:scenario>
 dsf
 </doc:scenario>
 </doc:example>

 */


(function () {
    angular.module('zenith.select', ['ngSanitize'])
        .directive('zSelect', zSelect)
        .directive('injectSubComponent', function () {
            return {
                link: function ($scope, $element, $attrs, controller, $transclude) {
                    var slotName = $attrs.injectSubComponent;
                    var innerScope = $scope.$new();
                    $transclude(innerScope, function (clone) {
                        $element.empty();
                        $element.append(clone);
                    }, null, slotName);
                    $element.on('$destroy', function () {
                        innerScope.$destroy();
                    });
                }
            };
        });
    zSelect.$inject = ['$document', 'templateConstants'];
    function zSelect($document, templateConstants) {
        var directive = {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                data: '=?',
                placeholder: '@',
                ngModel: "=",
                multiselect: "=?",
                searchFields: "@?",
                isDisabled: "=?",
                spinner: "=?",
                disabledProp: '@?',
                name: '@?',
                errors: '=?',
                optionRows: '@?'

            },
            replace: true,
            transclude: {
                option: 'zOption',
                exception: '?zOptionException',
                button: '?zOptionButton'
            },
            templateUrl: templateConstants.select,
            controller: SelectController,
            bindToController: true,
            controllerAs: 'ctrl',
            link: link
        };
        return directive;
        function link(scope, element, attr, ctrl, ngModel) {

            var onClick = function (event) {
                var isChild = $(element).has(event.target).length > 0;
                var isSelf = element[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    scope.$apply(scope.ctrl.closeOptions());
                }
            };
            scope.$watch('ctrl.show', function (newValue, oldValue) {
                if (newValue !== oldValue && newValue == true) {
                    $document.bind('click', onClick);
                } else if (newValue !== oldValue && newValue == false) {
                    $document.unbind('click', onClick);
                }
            });


            scope.$watch('ctrl.search', function (n, o) {
                if (!angular.equals(n, o)) {
                    if (n) {
                        if (!scope.ctrl.multiselect) {
                            if (Array.isArray(scope.ctrl.ngModel) && scope.ctrl.ngModel.length > 0) {
                                scope.ctrl.search = '';
                            }
                        }
                        if (n.length > 1) {
                            if (n[n.length - 2] === ' ' && n[n.length - 1] === ' ') {
                                scope.ctrl.search = n.substring(0, n.length - 1);
                            }
                        } else {
                            scope.ctrl.search = n.trim();
                        }
                        scope.ctrl.openOptions();
                    }
                } else {
                    scope.ctrl.closeOptions();
                }
            });
            // var parserResult = RepeatParser.parse(attr.repeat);
        }

    }

    SelectController.$inject = ['$scope', '$filter', '$element', '$transclude', '$timeout'];
    function SelectController($scope, $filter, $element, $transclude, $timeout) {
        var ctrl = this;

        function onLoad() {
            ctrl.search = '';
            ctrl.show = false;
            ctrl.firstItem = 0;
            ctrl.preSelectedItems = [];
            if(!angular.isArray(ctrl.ngModel)){
                ctrl.ngModel = [];
            }
            if (angular.isDefined(ctrl.optionRows)) {
                var x = parseInt(ctrl.optionRows);
                ctrl.maxRows = isNaN(x) ? 7 : x;
            } else {
                ctrl.maxRows = 7;
            }
            ctrl.useNgIf = $element[0].attributes['useNgIf'] || false;
            ctrl.itemHeight = 26;
            ctrl.preselectedIndex = -1;
            ctrl.labelPath = '#chevron-down-16';
            if (!Array.isArray(ctrl.ngModel)) {
                ctrl.ngModel = [];
            }
        }

        function updateModel() {
            $timeout(function () {
                $scope.$apply();
            }, 0);
        }

        function filterToLimit(array, limit) {
            return $filter('limitTo')(array, limit);
        }

        function calcWidth() {
            if (ctrl.ngModel.length > 0) {
                if (ctrl.search) {
                    return ctrl.search.length * 10 + 5;
                } else {
                    return 1;
                }
            } else {
                return '100%';
            }
        }

        function calcPadding() {
            if (ctrl.multiselect) {
                if (ctrl.ngModel.length > 0) {
                    return '0';
                } else {
                    return '0 0 0 6px';

                }
            } else {
                return '0 0 0 6px';
            }
        }

        function calcMarginLeft() {
            if (ctrl.multiselect && ctrl.ngModel.length > 0) {
                return '6px';
            } else {
                return '0';
            }
        }

        ctrl.openOptions = function () {
            if (!ctrl.isDisabled) {
                ctrl.show = true;
                ctrl.preselectedIndex = 0;
                ctrl.focusInput();
                ctrl.labelPath = '#chevron-up-16';
            }
        };
        ctrl.closeOptions = function () {
            ctrl.show = false;
            ctrl.labelPath = '#chevron-down-16';
        };
        ctrl.toggleOptions = function () {
            if (ctrl.show) {
                ctrl.closeOptions();
            } else {
                ctrl.openOptions();
            }
        };
        ctrl.calcInputStyle = function () {
            return {
                width: calcWidth(),
                padding: calcPadding(),
                'margin-left': calcMarginLeft()
            };
        };
        ctrl.filteredItems = function () {
            var searchFieldsArray = [];
            if (angular.isDefined(ctrl.searchFields)) {
                searchFieldsArray = ctrl.searchFields.split(';');
            }
            if (ctrl.search.length == 0 && angular.isDefined(ctrl.optionRows) && !isNaN(parseInt(ctrl.optionRows))) {
                return filterToLimit(ctrl.data, ctrl.maxRows);
            }
            if (searchFieldsArray.length !== 0) {
                var searchObject = {};
                searchFieldsArray.forEach(function (elem, i, array) {
                    searchObject[elem] = ctrl.search;
                });
                return $filter('filter')(ctrl.data, searchObject);
            } else {
                return $filter('filter')(ctrl.data, ctrl.search);
            }
        };
        ctrl.transcludePresent = function (slotName) {
            return $transclude.isSlotFilled(slotName);
        };
        ctrl.select = function (selectedItem) {
            if (!Array.isArray(ctrl.ngModel)) {
                ctrl.ngModel = [];
            }
            if (!selectedItem[ctrl.disabledProp]) {
                if (ctrl.multiselect) {
                    var check = false;
                    angular.forEach(ctrl.ngModel, function (k, v) {
                        if (angular.equals(k, selectedItem)) {
                            check = true;
                        }
                    });
                    if (check === false) {
                        ctrl.ngModel.push(selectedItem);
                        updateModel();
                        ctrl.search = '';
                    }
                } else {
                    ctrl.search = '';
                    ctrl.preselectedIndex = -1;
                    ctrl.ngModel = [];
                    ctrl.ngModel.push(selectedItem);
                    updateModel();
                }
                ctrl.closeOptions();
            }
        };
        ctrl.removeItem = function (el) {
            if (el.$index > -1) {
                ctrl.ngModel.splice(el.$index, 1);
            }
            updateModel();
        };
        ctrl.removeAllItems = function () {
            ctrl.ngModel = [];
            updateModel();
        };
        ctrl.showRemoveAllButton = function () {
            return ctrl.ngModel.length > 1;
        };
        ctrl.searchPlaceholder = function () {
            return ctrl.ngModel.length > 0 ? null : ctrl.placeholder;
        };
        ctrl.focusInput = function () {
            $element.find('.z-select-input').focus();
        };
        ctrl.onInputBlur = function () {
            ctrl.inputFocused = false;
            ctrl.closeOptions();
        };
        ctrl.noData = function () {
            if (ctrl.data) {
                return ctrl.data.length == 0;
            } else {
                return true;
            }
        };
        ctrl.preselect = function (item) {
            var tmp = ctrl.filteredItems()[ctrl.preselectedIndex] || '';
            return (angular.equals(item, tmp));
        };
        ctrl.checkSel = function (item) { // function checking if item is already selected in order to highlight it
            return ~ctrl.ngModel.indexOf(item);
            // for (var i = 0; i < ctrl.ngModel.length; i++) {
            //     if (angular.equals(ctrl.ngModel[i], item)) return true;
            // }
        };
        // Keys for select an item
        ctrl.keyControl = function (e) {
            // e.stopPropagation();
            var keyCode = (e.which) ? e.which : e.keyCode;
            if (keyCode == 13) {
                e.preventDefault();
            }
            var filteredDataLength = ctrl.filteredItems().length;
            switch (keyCode) {
                case 40: // Key down
                    if (ctrl.preselectedIndex < filteredDataLength - 1) {
                        var nextIndex = ctrl.preselectedIndex + 1;
                        ctrl.openOptions();
                        ctrl.preselectedIndex = nextIndex;
                    } else {
                        ctrl.openOptions();
                    }

                    break;
                case 38: // Key up
                    if (ctrl.preselectedIndex > 0) {
                        ctrl.preselectedIndex--;

                    } else {
                        ctrl.preselectedIndex = filteredDataLength - 1;
                    }
                    break;
                case 13: // Enter
                    if (ctrl.show) {
                        if (ctrl.preselectedIndex >= 0) {
                            ctrl.select(ctrl.filteredItems()[ctrl.preselectedIndex]);
                        }
                    } else {
                        ctrl.openOptions();
                    }


                    break;
                case 8: // Backspace
                    if (!ctrl.search) {
                        ctrl.ngModel.pop();
                        ctrl.preselected = 0;
                        updateModel();
                    }
                    break;
                case 27: // Escape
                    ctrl.closeOptions();
                    ctrl.preselected = 0;

                    break;
                default:
                    break;
            }
            if (ctrl.preselectedIndex >= ctrl.maxRows && ctrl.preselectedIndex / ctrl.maxRows >= Math.floor(ctrl.preselectedIndex / ctrl.maxRows)) {
                ctrl.firstItem = Math.floor(ctrl.preselectedIndex / ctrl.maxRows) * ctrl.maxRows + 1;
            } else {
                ctrl.firstItem = 0;
            }
            $($element).find('.z-select-options').scrollTop(ctrl.firstItem * ctrl.itemHeight);
        };
        onLoad();
    }

    /*.service('repeatParser', ['$parse', function ($parse) {
     var self = this;

     /!**
     * Example:
     * expression = "address in addresses | filter: {street: $select.search} track by $index"
     * itemName = "address",
     * source = "addresses | filter: {street: $select.search}",
     * trackByExp = "$index",
     *!/
     self.parse = function (expression) {


     var match;
     //var isObjectCollection = /\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)/.test(expression);
     // If an array is used as collection

     // if (isObjectCollection){
     // 000000000000000000000000000000111111111000000000000000222222222222220033333333333333333333330000444444444444444444000000000000000055555555555000000000000000000000066666666600000000
     match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(\s*[\s\S]+?)?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

     // 1 Alias
     // 2 Item
     // 3 Key on (key,value)
     // 4 Value on (key,value)
     // 5 Source expression (including filters)
     // 6 Track by

     if (!match) {
     console.error("Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'." + expression);
     }

     var source = match[5],
     filters = '';

     // When using (key,value) ui-select requires filters to be extracted, since the object
     // is converted to an array for $select.items
     // (in which case the filters need to be reapplied)
     if (match[3]) {
     // Remove any enclosing parenthesis
     source = match[5].replace(/(^\()|(\)$)/g, '');
     // match all after | but not after ||
     var filterMatch = match[5].match(/^\s*(?:[\s\S]+?)(?:[^\|]|\|\|)+([\s\S]*)\s*$/);
     if (filterMatch && filterMatch[1].trim()) {
     filters = filterMatch[1];
     source = source.replace(filters, '');
     }
     }

     return {
     itemName: match[4] || match[2], // (lhs) Left-hand side,
     keyName: match[3], //for (key, value) syntax
     source: $parse(source),
     filters: filters,
     trackByExp: match[6],
     modelMapper: $parse(match[1] || match[4] || match[2]),
     repeatExpression: function (grouped) {
     var expression = this.itemName + ' in ' + (grouped ? '$group.items' : '$select.items');
     if (this.trackByExp) {
     expression += ' track by ' + this.trackByExp;
     }
     return expression;
     }
     };

     };

     self.getGroupNgRepeatExpression = function () {
     return '$group in $select.groups track by $group.name';
     };

     }]);*/

})();

/**
 * @ngdoc directive
 * @name zenith.slidePanel:zSlidePanel
 * @element z-slide-panel
 * @param {expression} is-active Is panel active
 * @param {string} title Panel title
 * @param {string} title Panel width
 * @restrict E
 * @description
 * Slide panel
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <button class="btn m-blue" ng-click="ctrl.isActive = true">Show panel</button>
 <z-slide-panel is-active="ctrl.isActive" title="Slide panel example">
 <p>Slide panel content</p>
 <button class="btn" ng-click="ctrl.isActive = false">Close panel</button>
 </z-slide-panel>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.slidePanel', [])
        .directive('zSlidePanel', zSlidePanel);
    zSlidePanel.$inject = ['templateConstants'];
    function zSlidePanel(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                isActive: '=?',
                title: '@?',
                width: '@?'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.slidePanel,
            controller: SlidePanelController,
            controllerAs: 'ctrl',
            link: link,
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs) {
            element.removeAttr('title');
        }
    }
    SlidePanelController.$inject = ['$scope'];
    function SlidePanelController($scope) {
        var ctrl = this;

        ctrl.isActive = angular.isDefined(ctrl.isActive) ? ctrl.isActive : false;
        ctrl.hidePanel = hidePanel;

        function hidePanel() {
            ctrl.isActive = !ctrl.isActive;
        }

    }

})();
(function () {
    angular.module('zenith.spinner',[])
        .directive('zSpinner', zSpinner);
    zSpinner.$inject = ['templateConstants'];
    function zSpinner(templateConstants) {
        return {
            restrict: 'E',
            templateUrl: templateConstants.spinner,
            scope: {
                size: '=?',
                valign: '@?'
            },
            replace: true,
            controller: SpinnerController,
            controllerAs: 'ctrl'
        };
    };
    SpinnerController.$inject = ['$scope'];
    function SpinnerController($scope) {
        var ctrl = this;
        ctrl.size = $scope.size || 48;
        ctrl.valign = $scope.valign || 'top';
    }
})();
/**
 * @ngdoc directive
 * @name zenith.tabset:zTabset
 * @element z--tabset
 * @param {expression} is-active Is modal active
 * @param {string} title Tab title
 * @restrict E
 * @description
 * Modal dialog
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <z-tabset class="s-in-modal">
 <z-tab title="Mail flow">
 <p>Content 1</p>
 </z-tab>
 <z-tab title="Target password">
 <p>Content 2</p>
 </z-tab>
 <z-tab title="Other">
 <p>Content 3</p>
 </z-tab>
 </z-tabset>
 </div>
 </file>
 </example>
 */

/* Taken from angular Bootstrap */
(function () {
    angular.module('zenith.tabset', [])
        .directive('zTabset', zTabset)
        .directive('zTab', zTab)
        .directive('zTabTitleTransclude', zTabTitleTransclude)
        .directive('zTabContentTransclude', zTabContentTransclude);
    zTabset.$inject = ['templateConstants'];
    function zTabset(templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                type: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: templateConstants.tabset,
            controller: TabsetController,
            controllerAs: 'ctrl',
            link: link,
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs) {
            scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        }
    };
    zTab.$inject = ['$parse', 'templateConstants'];
    function zTab($parse, templateConstants) {
        var directive = {
            restrict: 'E',
            scope: {
                active: '=?',
                title: '@',
                onSelect: '&select', //This callback is called in contentTitleTransclude
                //once it inserts the tab's content into the dom
                onDeselect: '&deselect'
            },
            require: '^zTabset',
            replace: true,
            templateUrl: templateConstants.tab,
            transclude: true,
            controller: function () { },
            link: link
        };

        return directive;

        function link(scope, elm, attrs, tabsetCtrl, transclude) {
            scope.$watch('active', function (active) {
                if (active) {
                    tabsetCtrl.select(scope);
                }
            });

            scope.disabled = false;
            if (attrs.disable) {
                scope.$parent.$watch($parse(attrs.disable), function (value) {
                    scope.disabled = !!value;
                });
            }

            scope.select = function () {
                if (!scope.disabled) {
                    scope.active = true;
                }
            };

            tabsetCtrl.addTab(scope);
            scope.$on('$destroy', function () {
                tabsetCtrl.removeTab(scope);
            });

            //We need to transclude later, once the content container is ready.
            //when this link happens, we're inside a tab title.
            scope.$transcludeFn = transclude;
        }
    };
    function zTabTitleTransclude() {
        var directive = {
            restrict: 'A',
            require: '^zTab',
            link: link
        };
        return directive;
        function link(scope, elm) {
            scope.$watch('titleElement', function updateTitleElement(title) {
                elm.parent().removeAttr('title');
                if (title) {
                    elm.html('');
                    elm.append(title);
                }
            });
        }
    };
    function zTabContentTransclude() {
        var directive = {
            restrict: 'A',
            require: '^zTabset',
            link: link
        };
        return directive;
        function link(scope, elm, attrs) {
            var tab = scope.$eval(attrs.zTabContentTransclude);

            //Now our tab is ready to be transcluded: both the tab title area
            //and the tab content area are loaded.  Transclude 'em both.
            tab.$transcludeFn(tab.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    if (isTabTitle(node)) {
                        //Let tabTitleTransclude know.
                        tab.titleElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        };
        function isTabTitle(node) {
            return node.tagName && (
                node.hasAttribute('uib-tab-title') ||
                node.hasAttribute('data-uib-tab-title') ||
                node.hasAttribute('x-uib-tab-title') ||
                node.tagName.toLowerCase() === 'uib-tab-title' ||
                node.tagName.toLowerCase() === 'data-uib-tab-title' ||
                node.tagName.toLowerCase() === 'x-uib-tab-title'
                );
        }
    };
    TabsetController.$inject = ['$scope'];
    function TabsetController($scope) {
        var ctrl = this,
            tabs = ctrl.tabs = $scope.tabs = [];

        ctrl.select = function (selectedTab) {
            angular.forEach(tabs, function (tab) {
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                    tab.onDeselect();
                    selectedTab.selectCalled = false;
                }
            });
            selectedTab.active = true;
            // only call select if it has not already been called
            if (!selectedTab.selectCalled) {
                selectedTab.onSelect();
                selectedTab.selectCalled = true;
            }
        };

        ctrl.addTab = function addTab(tab) {
            tabs.push(tab);
            // we can't run the select function on the first tab
            // since that would select it twice
            if (tabs.length === 1 && tab.active !== false) {
                tab.active = true;
            } else if (tab.active) {
                ctrl.select(tab);
            } else {
                tab.active = false;
            }
        };

        ctrl.removeTab = function removeTab(tab) {
            var index = tabs.indexOf(tab);
            //Select a new tab if the tab to be removed is selected and not destroyed
            if (tab.active && tabs.length > 1 && !destroyed) {
                //If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index === tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        };

        var destroyed;
        $scope.$on('$destroy', function () {
            destroyed = true;
        });
    }
})();
/**
 * @ngdoc directive
 * @name zenith.th:zTh
 * @element th
 * @param {string} key Sorting key
 * @param {string} auto-sort Sort column by default
 * @restrict A
 * @description
 * Table head directive for sorting
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <table class="table">
 <thead class="table-head" z-thead sort-key="accounts.sortKey" sort-desc="accounts.sortDesc">
 <tr>
 <th>
 <z-select-array array="accountTypes" selection="selectedItems"></z-select-array>
 </th>
 <th z-th key="name" auto-sort="asc">Account type</th>
 </tr>
 </thead>
 <tbody class="table-body">
 <tr ng-repeat="account in accounts.currentPage">
 <td>
 <z-select-item item="account" selection="selectedItems"></z-select-item>
 </td>
 <td>{{ account.name }}</td>
 </tr>
 </tbody>
 </table>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.th', ['zenith.thead'])
        .directive('zTh', zTh);
    zTh.$inject = ['templateConstants'];
    function zTh(templateConstants) {
        var directive = {
            restrict: 'A',
            templateUrl: templateConstants.th,
            replace: false,
            transclude: true,
            require: '^zThead',
            scope: {
                key: '@',
                autoSort: '@'
            },
            controller: ThController,
            controllerAs: 'ctrl',
            bindToController: true,
            link: link
        };

        return directive;

        function link(scope, element, attrs, TheadController) {
            scope.ctrl.sortColumn = function (key) {
                scope.ctrl.sortDesc = (TheadController.getSortKey() == key) ? !scope.ctrl.sortDesc : false;
                TheadController.sortBy(key);
            };

            scope.ctrl.getSortKey = function () {
                return TheadController.getSortKey();
            };
        }
    }

    function ThController($scope, $element, $attrs) {
        var ctrl = this;
        var theadScope = $scope.$parent;

        ctrl.sort = !($attrs.sort === 'false');

        if (ctrl.autoSort === 'asc') {
            theadScope.sortKey = ctrl.key;
            theadScope.sortDesc = false;
        } else if (ctrl.autoSort === 'desc') {
            theadScope.sortKey = ctrl.key;
            theadScope.sortDesc = true;
        }
    }

})();
/**
 * @ngdoc directive
 * @name zenith.tooltip:zTooltip
 * @element z-tooltip
 * @param {number} delay Delay before the tooltip starts its opening animation. Default: 10
 * @param {expression} disable Temporarily disables a tooltip from being able to open
 * @param {number} maxWidth Sets a maximum width for the tooltip. Default: 300
 * @param {number} offsetX Sets the distance between the right side of the origin and the left side of tooltip
 * @param {number} offsetY Sets the distance between the top side of the origin and the top side of tooltip
 * @param {string} position Sets the side of the tooltip. Accepted values: 'top', 'right', 'bottom', 'left'. Default: 'top'
 * @param {string} speed How long (in ms) the tooltip should live before closing. Default: '0'
 * @param {expression} show If true shows tooltip
 * @param {string} trigger Sets when the tooltip should open and close. Accepted values: 'hover', 'click' or 'custom'. Default: 'hover'
 * @param {string} zTooltip Sets tooltip's content
 * @param {number} interactiveTolerance  Delay before the tooltip starts its closing animation. Default: 350
 * @param {expression} hideIfEmpty If true and tooltip is empty, temporarily disables a tooltip from being able to open
 * @restrict A
 * @description
 * Creates UI element for tooltip.
 *
 * @example
 <example module="example">
     <file name="index.html">
         <label>
             Account number
             <svg class="icon m-size-16 m-gray"
                  z-tooltip="Number Porting Transfer Wizard > Current billing Account info > Account number"
                  position="right">
                 <use xlink:href="#info-16" />
             </svg>
         </label>
     </file>
 </example>
*/


(function() {
    angular.module('zenith.tooltip', [])
        .directive('zTooltip', zTooltip);

        function zTooltip() {
            var directive = {
                restrict: 'A',
                scope: {
                    delay: '@?',
                    disable: '=?',
                    maxWidth: '@?',
                    offsetX: '@?',
                    offsetY: '@?',
                    position: '@?',
                    speed: '@?',
                    show: '=?',
                    trigger: '@?',
                    zTooltip: '@?',
                    interactiveTolerance: '@?',
                    hideIfEmpty: '@?'
                },
                link: link
            };

            function link(scope, element, attr) {
                $(element).tooltipster({
                    content: scope.zTooltip,
                    delay: scope.delay || 10,
                    functionAfter: function () {
                        if (angular.isDefined(scope.show)) {
                            scope.show = false;
                        }
                    },
                    interactive: true,
                    maxWidth: scope.maxWidth || 300,
                    offsetX: scope.offsetX || 0,
                    offsetY: scope.offsetY || 0,
                    position: scope.position || 'top',
                    speed: scope.speed || '0',
                    trigger: scope.trigger || 'hover',
                    contentAsHTML: true,
                    updateAnimation: false,
                    interactiveTolerance: scope.interactiveTolerance || 350
                });

                if (scope.trigger === 'focus') {
                    $(element).tooltipster('option', 'trigger', 'custom');

                    $(element)
                        .focus(function () {
                            $(this).tooltipster('show');
                        })
                        .blur(function () {
                            $(this).tooltipster('hide');
                        });
                }

                scope.$watch('zTooltip', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $(element).tooltipster('content', newValue);
                    }

                    if (scope.hideIfEmpty === "true") {
                        setDisableState();
                    }
                });

                scope.$watch('disable', function (newValue) {
                    setDisableState();
                });

                scope.$watch('show', function (newValue) {
                    if (newValue) {
                        $(element).tooltipster('show');
                    } else {
                        $(element).tooltipster('hide');
                    }
                });

                var setDisableState = function() {
                    if (scope.disable || hideEmptyTooltip()) {
                        $(element).tooltipster('disable');
                    } else {
                        $(element).tooltipster('enable');
                    }
                }

                var hideEmptyTooltip = function() {
                    return scope.hideIfEmpty === "true" && (scope.zTooltip === null || scope.zTooltip === undefined || scope.zTooltip === '');
                }
            }

            return directive;
        }
})();

/**
 * @ngdoc directive
 * @name zenith.tourSlider:zTourSlider
 * @element z-tour-slider
 * @param {function} onSkip adds button that triggers action function from this param
 * @restrict E
 * @description
 * Creates UI element for slider.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <z-tour-slider>
 <z-tour-slider-step>
 <div class="f-row">
 <div class="f-col-8">
 <div class="m16">
 <h3>All slides must be same height and width!</h3>
 <div class="mt24">
 <h3>Params:</h3>
 <ul>
 <li>
 <strong>on-skip</strong> (optional): function that triggers on "Skip tour" button
 </li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </z-tour-slider-step>
 <z-tour-slider-step>
 <div class="f-row">
 <div class="f-col-8">Another content</div>
 </div>
 </z-tour-slider-step>
 </z-tour-slider>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.tourSlider', [])
        .directive('zTourSlider', [function () {
            tourCtrl.$inject = ['$scope', '$element', '$attrs'];
            function tourCtrl($scope, $element, $attrs) {
                var ctrl = this;
                ctrl.stepList = [];
                ctrl.currentIndex = 0;

                function showStep(index) {
                    ctrl.stepList[index].ctrl.showSlide = true;
                }

                function hideStep(index) {
                    ctrl.stepList[index].ctrl.showSlide = false;
                }

                ctrl.nextStep = function () {
                    hideStep(ctrl.currentIndex);
                    ctrl.currentIndex++;
                    showStep(ctrl.currentIndex);
                };
                ctrl.prevStep = function () {
                    hideStep(ctrl.currentIndex);
                    ctrl.currentIndex--;
                    showStep(ctrl.currentIndex);
                };

                ctrl.skipTour = function () {
                    ctrl.onSkip()();
                };
                ctrl.addStep = function (step) {
                    ctrl.stepList.push(step);
                    if (ctrl.stepList.length === 1) {
                        showStep(ctrl.currentIndex);
                    }
                };
            }

            return {
                restrict: 'E',
                replace: true,
                scope: {
                    onSkip: '&?'
                },
                controller: tourCtrl,
                transclude: true,
                bindToController: true,
                controllerAs: 'ctrl',
                templateUrl: '/zenith/src/components/tour-slider/tour-slider.template.html'

            };
        }])

        .directive('zTourSliderStep', [function () {
            function link(scope, element, attrs, tourCtrl) {
                tourCtrl.addStep({ctrl: scope.ctrl});
            }

            stepCtrl.$inject = ['$scope', '$element', '$attrs'];
            function stepCtrl($scope, $element, $attrs) {
                var ctrl = this;
                ctrl.showSlide = false;
            }

            return {
                restrict: 'E',
                require: '^zTourSlider',
                replace: true,
                scope: true,
                controller: stepCtrl,
                controllerAs: 'ctrl',
                bindToController: true,
                transclude: true,
                link: link,
                templateUrl: '/zenith/src/components/tour-slider/tour-slider-step.template.html'

            };
        }]);
})();

/**
 * @ngdoc directive
 * @name zenith.validation:zValidation
 * @element z-validation
 * @param {string} field field
 * @param {string} error field
 * @restrict A
 * @description
 * Validation element.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <input />

 <z:validation field="icon" error="error">
 Validation message
 </z:validation>
 </file>
 </example>
 */
﻿
(function () {
    angular.module('zenith.validation', [])
        .directive('zValidation', zValidation);
    zValidation.$inject = ['templateConstants'];
    function zValidation(templateConstants) {
        var directive = {
            restrict: 'E',
            replace: true,
            require: '^?zValidateForm',
            scope: {
                field: '@',
                error: '@',
            },
            transclude: true,
            controller: ValidationController,
            bindToController: true,
            controllerAs: 'vm',
            link: link,
            templateUrl: templateConstants.validation
        };
        function link(scope, element, attrs, validateFormController) {
            if (validateFormController !== null) {
                scope.showValidation = function () {
                    scope.show = true;
                };

                scope.hideValidation = function () {
                    scope.show = false;
                };

                validateFormController.addValidation({
                    field: attrs.field,
                    error: attrs.error,
                    scope: scope,
                    element: element
                });
            }
        }
        return directive;
    };
    function ValidationController() {
        var vm = this;
        vm.show = true;
    }

})();

/**
 * @ngdoc directive
 * @name zenith.bindHtmlUnsafe:zBindHtmlUnsafe
 * @element div
 * @param {string} z-bind-html-unsafe Sorting key
 * @restrict A
 * @description
 * Binds html from model
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
    <div z-bind-html-unsafe="bindHtml"></div>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.bindHtmlUnsafe', [])
        .directive('zBindHtmlUnsafe', function () {
            return function (scope, element, attr) {
                element.addClass('ng-binding').data('$binding', attr.zBindHtmlUnsafe);
                scope.$watch(attr.zBindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
                    element.html(value || '');
                });
            };
        });
})();
/**
 * @ngdoc directive
 * @name zenith.changeIndicator:zChangeIndicator
 * @element z-change-indicator
 * @restrict A
 * @description
 * directive that shows changed elements of table, such as checkboxes.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <table class="table table-hover">
 <thead z-thead sort-key="ctrl.accounts.sortKey" sort-desc="ctrl.accounts.sortDesc" class="table-head">
 <tr>
 <th>
 <z-check-all data="ctrl.accounts" state="true" on-change="preselectionChanged = true"
 select-field="selected"></z-check-all>
 </th>
 <th z-th key="name" auto-sort="asc">Name</th>
 <th z-th key="phone">Number</th>
 <th z-th key="house">House</th>
 <th z-th key="isDead">State</th>
 </tr>
 </thead>
 <tbody ng-repeat="row in ctrl.accounts.currentPage" class="table-body">
 <tr ng-show="ctrl.accounts.ready && ctrl.accounts.total > 0">
 <td>
 <input type="checkbox" ng-model="row.selected" z-change-indicator row="row" uniq-field="'$uniqID'" changable-field="'selected'" watch-set="ctrl.accounts.currentPage" default-value-set="defaults"/>
 </td>
 <td>{{row.name}}</td>
 <td class="m-text-right">{{row.phone}}</td>
 <td>{{row.house}}</td>
 <td>
 <span ng-if="!row.isDead">Alive</span>
 <span ng-if="row.isDead">Dead</span>
 </td>
 </tr>
 <tr ng-show="ctrl.accounts.ready && ctrl.accounts.total == 0">
 <td colspan="5">
 <div>Nothing found</div>
 </td>
 </tr>
 </tbody>
 <tfoot class="table-footer">
 <tr>
 <td colspan="4">
 <div class="table-control-wrap">
 <div class="table-control j-table-footer">
 <div class="table-actions j-table-actions">
 <button class="btn m-primary">
 <span>Save changes</span>
 </button>
 </div>
 </div>
 </div>
 </td>
 <td>
 <div class="table-control">
 <z-pagination total="ctrl.accounts.total" start="ctrl.accounts.start"
 limit="ctrl.accounts.limit"></z-pagination>
 </div>

 </td>
 </tr>
 </tfoot>
 </table>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.changeIndicator', [])
        .directive('zChangeIndicator', [zChangeIndicator]);
    function zChangeIndicator() {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                row: '=',
                uniqField: '=',
                changableField: '=',
                watchSet: '=',
                defaultValueSet: '='
            },
            link: function ($scope, element, attrs, ngModel) {
                function saveDefaults(row) {
                    for (var i = 0; i < $scope.defaultValueSet.length; i++) {
                        if ($scope.defaultValueSet[i][$scope.uniqField] === row[$scope.uniqField]) {
                            return;
                        }
                    }
                    $scope.defaultValueSet.push(angular.copy(row));
                }

                $scope.$watch('watchSet', function (nv) {
                        nv.forEach(function (element) {
                            saveDefaults(element);
                        });
                    }
                );
                $scope.itemChanged = function (row, field) {
                    if ($scope.defaultValueSet != undefined) {
                        for (var i = 0; i < $scope.defaultValueSet.length; i++) {
                            if ($scope.defaultValueSet[i][$scope.uniqField] === row[$scope.uniqField]) {
                                return row[field] !== $scope.defaultValueSet[i][field]
                            }
                        }
                    }
                };
                element.addClass('changeable-item');
                $scope.$watch(function () {
                    return $scope.itemChanged($scope.row, $scope.changableField)
                }, function (nv) {
                    if (nv) {
                        element.addClass('changed');
                    } else {
                        element.removeClass('changed');
                    }
                });
            }
        };
    }
})();
(function () {
    angular.module('zenith.customFilter', [])
        .directive('zCustomFilter', [function () {
            return {
                restrict: 'E',
                templateUrl: '/zenith/src/directives/custom-filter/custom-filter.template.html',
                replace: true,
                require: '^zFilters',
                transclude: 'element',
                scope: {
                    autoActive: '=?',
                    caption: '=?',
                    disabled: '=?',
                    hidecount: '=',
                    key: '@',
                    value: '@'
                },
                compile: function (tElement, tAttrs, transclude) {
                    return function (scope, element, attrs, filtersCtrl) {
                        scope.activate = function () {
                            filtersCtrl.setActive(scope.key, scope.value, scope.caption);
                        };

                        scope.isActive = function () {
                            return filtersCtrl.isActive(scope.key, scope.value);
                        };

                        scope.isDisabled = function () {
                            return filtersCtrl.isDisabled();
                        };

                        scope.getCount = function () {
                            if (scope.hidecount !== true) {
                                return filtersCtrl.getCount(scope.key, scope.value);
                            }
                        };

                        transclude(scope, function (clone) {
                            scope.caption = scope.caption != undefined ? scope.caption : clone.html();
                        });

                        if ((scope.autoActive !== undefined && scope.autoActive !== false) || (attrs.autoActive === '')) {
                            scope.activate();
                        }
                    };
                }
            }
        }]);
})();
(function () {
    angular.module('zenith.dateFormat', ['zenith.dateFormat'])
        .directive('zDateFormat', ['$filter', function ($filter) {
            var directive = {
                restrict: 'A',
                require: 'ngModel',
                controller: DateFormatController,
                link: link
            };

            return directive;

            function DateFormatController($scope, $element, $attrs) {

            }

            function link(scope, element, attrs, ngModel) {
                // Format input date
                var format = angular.isDefined(attrs.zDateFormat) ? attrs.zDateFormat : 'MMM dd yyyy';
                ngModel.$formatters.push(function (modelValue) {
                    return $filter('date')(modelValue, format);
                });
            }
        }]);
})();
/* Imported from UI-Bootstrap */
angular.module('zenith.position', [])

/**
 * A set of utility methods for working with the DOM.
 * It is meant to be used where we need to absolute-position elements in
 * relation to another element (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
    .factory('$zPosition', ['$document', '$window', function($document, $window) {
        /**
         * Used by scrollbarWidth() function to cache scrollbar's width.
         * Do not access this variable directly, use scrollbarWidth() instead.
         */
        var SCROLLBAR_WIDTH;
        /**
         * scrollbar on body and html element in IE and Edge overlay
         * content and should be considered 0 width.
         */
        var BODY_SCROLLBAR_WIDTH;
        var OVERFLOW_REGEX = {
            normal: /(auto|scroll)/,
            hidden: /(auto|scroll|hidden)/
        };
        var PLACEMENT_REGEX = {
            auto: /\s?auto?\s?/i,
            primary: /^(top|bottom|left|right)$/,
            secondary: /^(top|bottom|left|right|center)$/,
            vertical: /^(top|bottom)$/
        };
        var BODY_REGEX = /(HTML|BODY)/;

        return {

            /**
             * Provides a raw DOM element from a jQuery/jQLite element.
             *
             * @param {element} elem - The element to convert.
             *
             * @returns {element} A HTML element.
             */
            getRawNode: function(elem) {
                return elem.nodeName ? elem : elem[0] || elem;
            },

            /**
             * Provides a parsed number for a style property.  Strips
             * units and casts invalid numbers to 0.
             *
             * @param {string} value - The style value to parse.
             *
             * @returns {number} A valid number.
             */
            parseStyle: function(value) {
                value = parseFloat(value);
                return isFinite(value) ? value : 0;
            },

            /**
             * Provides the closest positioned ancestor.
             *
             * @param {element} element - The element to get the offest parent for.
             *
             * @returns {element} The closest positioned ancestor.
             */
            offsetParent: function(elem) {
                elem = this.getRawNode(elem);

                var offsetParent = elem.offsetParent || $document[0].documentElement;

                function isStaticPositioned(el) {
                    return ($window.getComputedStyle(el).position || 'static') === 'static';
                }

                while (offsetParent && offsetParent !== $document[0].documentElement && isStaticPositioned(offsetParent)) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || $document[0].documentElement;
            },

            /**
             * Provides the scrollbar width, concept from TWBS measureScrollbar()
             * function in https://github.com/twbs/bootstrap/blob/master/js/modal.js
             * In IE and Edge, scollbar on body and html element overlay and should
             * return a width of 0.
             *
             * @returns {number} The width of the browser scollbar.
             */
            scrollbarWidth: function(isBody) {
                if (isBody) {
                    if (angular.isUndefined(BODY_SCROLLBAR_WIDTH)) {
                        var bodyElem = $document.find('body');
                        bodyElem.addClass('z-position-body-scrollbar-measure');
                        BODY_SCROLLBAR_WIDTH = $window.innerWidth - bodyElem[0].clientWidth;
                        BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
                        bodyElem.removeClass('z-position-body-scrollbar-measure');
                    }
                    return BODY_SCROLLBAR_WIDTH;
                }

                if (angular.isUndefined(SCROLLBAR_WIDTH)) {
                    var scrollElem = angular.element('<div class="z-position-scrollbar-measure"></div>');
                    $document.find('body').append(scrollElem);
                    SCROLLBAR_WIDTH = scrollElem[0].offsetWidth - scrollElem[0].clientWidth;
                    SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
                    scrollElem.remove();
                }

                return SCROLLBAR_WIDTH;
            },

            /**
             * Provides the padding required on an element to replace the scrollbar.
             *
             * @returns {object} An object with the following properties:
             *   <ul>
             *     <li>**scrollbarWidth**: the width of the scrollbar</li>
             *     <li>**widthOverflow**: whether the the width is overflowing</li>
             *     <li>**right**: the amount of right padding on the element needed to replace the scrollbar</li>
             *     <li>**rightOriginal**: the amount of right padding currently on the element</li>
             *     <li>**heightOverflow**: whether the the height is overflowing</li>
             *     <li>**bottom**: the amount of bottom padding on the element needed to replace the scrollbar</li>
             *     <li>**bottomOriginal**: the amount of bottom padding currently on the element</li>
             *   </ul>
             */
            scrollbarPadding: function(elem) {
                elem = this.getRawNode(elem);

                var elemStyle = $window.getComputedStyle(elem);
                var paddingRight = this.parseStyle(elemStyle.paddingRight);
                var paddingBottom = this.parseStyle(elemStyle.paddingBottom);
                var scrollParent = this.scrollParent(elem, false, true);
                var scrollbarWidth = this.scrollbarWidth(BODY_REGEX.test(scrollParent.tagName));

                return {
                    scrollbarWidth: scrollbarWidth,
                    widthOverflow: scrollParent.scrollWidth > scrollParent.clientWidth,
                    right: paddingRight + scrollbarWidth,
                    originalRight: paddingRight,
                    heightOverflow: scrollParent.scrollHeight > scrollParent.clientHeight,
                    bottom: paddingBottom + scrollbarWidth,
                    originalBottom: paddingBottom
                };
            },

            /**
             * Checks to see if the element is scrollable.
             *
             * @param {element} elem - The element to check.
             * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
             *   default is false.
             *
             * @returns {boolean} Whether the element is scrollable.
             */
            isScrollable: function(elem, includeHidden) {
                elem = this.getRawNode(elem);

                var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
                var elemStyle = $window.getComputedStyle(elem);
                return overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX);
            },

            /**
             * Provides the closest scrollable ancestor.
             * A port of the jQuery UI scrollParent method:
             * https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js
             *
             * @param {element} elem - The element to find the scroll parent of.
             * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
             *   default is false.
             * @param {boolean=} [includeSelf=false] - Should the element being passed be
             * included in the scrollable llokup.
             *
             * @returns {element} A HTML element.
             */
            scrollParent: function(elem, includeHidden, includeSelf) {
                elem = this.getRawNode(elem);

                var overflowRegex = includeHidden ? OVERFLOW_REGEX.hidden : OVERFLOW_REGEX.normal;
                var documentEl = $document[0].documentElement;
                var elemStyle = $window.getComputedStyle(elem);
                if (includeSelf && overflowRegex.test(elemStyle.overflow + elemStyle.overflowY + elemStyle.overflowX)) {
                    return elem;
                }
                var excludeStatic = elemStyle.position === 'absolute';
                var scrollParent = elem.parentElement || documentEl;

                if (scrollParent === documentEl || elemStyle.position === 'fixed') {
                    return documentEl;
                }

                while (scrollParent.parentElement && scrollParent !== documentEl) {
                    var spStyle = $window.getComputedStyle(scrollParent);
                    if (excludeStatic && spStyle.position !== 'static') {
                        excludeStatic = false;
                    }

                    if (!excludeStatic && overflowRegex.test(spStyle.overflow + spStyle.overflowY + spStyle.overflowX)) {
                        break;
                    }
                    scrollParent = scrollParent.parentElement;
                }

                return scrollParent;
            },

            /**
             * Provides read-only equivalent of jQuery's position function:
             * http://api.jquery.com/position/ - distance to closest positioned
             * ancestor.  Does not account for margins by default like jQuery position.
             *
             * @param {element} elem - The element to caclulate the position on.
             * @param {boolean=} [includeMargins=false] - Should margins be accounted
             * for, default is false.
             *
             * @returns {object} An object with the following properties:
             *   <ul>
             *     <li>**width**: the width of the element</li>
             *     <li>**height**: the height of the element</li>
             *     <li>**top**: distance to top edge of offset parent</li>
             *     <li>**left**: distance to left edge of offset parent</li>
             *   </ul>
             */
            position: function(elem, includeMagins) {
                elem = this.getRawNode(elem);

                var elemOffset = this.offset(elem);
                if (includeMagins) {
                    var elemStyle = $window.getComputedStyle(elem);
                    elemOffset.top -= this.parseStyle(elemStyle.marginTop);
                    elemOffset.left -= this.parseStyle(elemStyle.marginLeft);
                }
                var parent = this.offsetParent(elem);
                var parentOffset = {top: 0, left: 0};

                if (parent !== $document[0].documentElement) {
                    parentOffset = this.offset(parent);
                    parentOffset.top += parent.clientTop - parent.scrollTop;
                    parentOffset.left += parent.clientLeft - parent.scrollLeft;
                }

                return {
                    width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
                    height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
                    top: Math.round(elemOffset.top - parentOffset.top),
                    left: Math.round(elemOffset.left - parentOffset.left)
                };
            },

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * http://api.jquery.com/offset/ - distance to viewport.  Does
             * not account for borders, margins, or padding on the body
             * element.
             *
             * @param {element} elem - The element to calculate the offset on.
             *
             * @returns {object} An object with the following properties:
             *   <ul>
             *     <li>**width**: the width of the element</li>
             *     <li>**height**: the height of the element</li>
             *     <li>**top**: distance to top edge of viewport</li>
             *     <li>**right**: distance to bottom edge of viewport</li>
             *   </ul>
             */
            offset: function(elem) {
                elem = this.getRawNode(elem);

                var elemBCR = elem.getBoundingClientRect();
                return {
                    width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
                    height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
                    top: Math.round(elemBCR.top + ($window.pageYOffset || $document[0].documentElement.scrollTop)),
                    left: Math.round(elemBCR.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft))
                };
            },

            /**
             * Provides offset distance to the closest scrollable ancestor
             * or viewport.  Accounts for border and scrollbar width.
             *
             * Right and bottom dimensions represent the distance to the
             * respective edge of the viewport element.  If the element
             * edge extends beyond the viewport, a negative value will be
             * reported.
             *
             * @param {element} elem - The element to get the viewport offset for.
             * @param {boolean=} [useDocument=false] - Should the viewport be the document element instead
             * of the first scrollable element, default is false.
             * @param {boolean=} [includePadding=true] - Should the padding on the offset parent element
             * be accounted for, default is true.
             *
             * @returns {object} An object with the following properties:
             *   <ul>
             *     <li>**top**: distance to the top content edge of viewport element</li>
             *     <li>**bottom**: distance to the bottom content edge of viewport element</li>
             *     <li>**left**: distance to the left content edge of viewport element</li>
             *     <li>**right**: distance to the right content edge of viewport element</li>
             *   </ul>
             */
            viewportOffset: function(elem, useDocument, includePadding) {
                elem = this.getRawNode(elem);
                includePadding = includePadding !== false ? true : false;

                var elemBCR = elem.getBoundingClientRect();
                var offsetBCR = {top: 0, left: 0, bottom: 0, right: 0};

                var offsetParent = useDocument ? $document[0].documentElement : this.scrollParent(elem);
                var offsetParentBCR = offsetParent.getBoundingClientRect();

                offsetBCR.top = offsetParentBCR.top + offsetParent.clientTop;
                offsetBCR.left = offsetParentBCR.left + offsetParent.clientLeft;
                if (offsetParent === $document[0].documentElement) {
                    offsetBCR.top += $window.pageYOffset;
                    offsetBCR.left += $window.pageXOffset;
                }
                offsetBCR.bottom = offsetBCR.top + offsetParent.clientHeight;
                offsetBCR.right = offsetBCR.left + offsetParent.clientWidth;

                if (includePadding) {
                    var offsetParentStyle = $window.getComputedStyle(offsetParent);
                    offsetBCR.top += this.parseStyle(offsetParentStyle.paddingTop);
                    offsetBCR.bottom -= this.parseStyle(offsetParentStyle.paddingBottom);
                    offsetBCR.left += this.parseStyle(offsetParentStyle.paddingLeft);
                    offsetBCR.right -= this.parseStyle(offsetParentStyle.paddingRight);
                }

                return {
                    top: Math.round(elemBCR.top - offsetBCR.top),
                    bottom: Math.round(offsetBCR.bottom - elemBCR.bottom),
                    left: Math.round(elemBCR.left - offsetBCR.left),
                    right: Math.round(offsetBCR.right - elemBCR.right)
                };
            },

            /**
             * Provides an array of placement values parsed from a placement string.
             * Along with the 'auto' indicator, supported placement strings are:
             *   <ul>
             *     <li>top: element on top, horizontally centered on host element.</li>
             *     <li>top-left: element on top, left edge aligned with host element left edge.</li>
             *     <li>top-right: element on top, lerightft edge aligned with host element right edge.</li>
             *     <li>bottom: element on bottom, horizontally centered on host element.</li>
             *     <li>bottom-left: element on bottom, left edge aligned with host element left edge.</li>
             *     <li>bottom-right: element on bottom, right edge aligned with host element right edge.</li>
             *     <li>left: element on left, vertically centered on host element.</li>
             *     <li>left-top: element on left, top edge aligned with host element top edge.</li>
             *     <li>left-bottom: element on left, bottom edge aligned with host element bottom edge.</li>
             *     <li>right: element on right, vertically centered on host element.</li>
             *     <li>right-top: element on right, top edge aligned with host element top edge.</li>
             *     <li>right-bottom: element on right, bottom edge aligned with host element bottom edge.</li>
             *   </ul>
             * A placement string with an 'auto' indicator is expected to be
             * space separated from the placement, i.e: 'auto bottom-left'  If
             * the primary and secondary placement values do not match 'top,
             * bottom, left, right' then 'top' will be the primary placement and
             * 'center' will be the secondary placement.  If 'auto' is passed, true
             * will be returned as the 3rd value of the array.
             *
             * @param {string} placement - The placement string to parse.
             *
             * @returns {array} An array with the following values
             * <ul>
             *   <li>**[0]**: The primary placement.</li>
             *   <li>**[1]**: The secondary placement.</li>
             *   <li>**[2]**: If auto is passed: true, else undefined.</li>
             * </ul>
             */
            parsePlacement: function(placement) {
                var autoPlace = PLACEMENT_REGEX.auto.test(placement);
                if (autoPlace) {
                    placement = placement.replace(PLACEMENT_REGEX.auto, '');
                }

                placement = placement.split('-');

                placement[0] = placement[0] || 'top';
                if (!PLACEMENT_REGEX.primary.test(placement[0])) {
                    placement[0] = 'top';
                }

                placement[1] = placement[1] || 'center';
                if (!PLACEMENT_REGEX.secondary.test(placement[1])) {
                    placement[1] = 'center';
                }

                if (autoPlace) {
                    placement[2] = true;
                } else {
                    placement[2] = false;
                }

                return placement;
            },

            /**
             * Provides coordinates for an element to be positioned relative to
             * another element.  Passing 'auto' as part of the placement parameter
             * will enable smart placement - where the element fits. i.e:
             * 'auto left-top' will check to see if there is enough space to the left
             * of the hostElem to fit the targetElem, if not place right (same for secondary
             * top placement).  Available space is calculated using the viewportOffset
             * function.
             *
             * @param {element} hostElem - The element to position against.
             * @param {element} targetElem - The element to position.
             * @param {string=} [placement=top] - The placement for the targetElem,
             *   default is 'top'. 'center' is assumed as secondary placement for
             *   'top', 'left', 'right', and 'bottom' placements.  Available placements are:
             *   <ul>
             *     <li>top</li>
             *     <li>top-right</li>
             *     <li>top-left</li>
             *     <li>bottom</li>
             *     <li>bottom-left</li>
             *     <li>bottom-right</li>
             *     <li>left</li>
             *     <li>left-top</li>
             *     <li>left-bottom</li>
             *     <li>right</li>
             *     <li>right-top</li>
             *     <li>right-bottom</li>
             *   </ul>
             * @param {boolean=} [appendToBody=false] - Should the top and left values returned
             *   be calculated from the body element, default is false.
             *
             * @returns {object} An object with the following properties:
             *   <ul>
             *     <li>**top**: Value for targetElem top.</li>
             *     <li>**left**: Value for targetElem left.</li>
             *     <li>**placement**: The resolved placement.</li>
             *   </ul>
             */
            positionElements: function(hostElem, targetElem, placement, appendToBody) {
                hostElem = this.getRawNode(hostElem);
                targetElem = this.getRawNode(targetElem);

                // need to read from prop to support tests.
                var targetWidth = angular.isDefined(targetElem.offsetWidth) ? targetElem.offsetWidth : targetElem.prop('offsetWidth');
                var targetHeight = angular.isDefined(targetElem.offsetHeight) ? targetElem.offsetHeight : targetElem.prop('offsetHeight');

                placement = this.parsePlacement(placement);

                var hostElemPos = appendToBody ? this.offset(hostElem) : this.position(hostElem);
                var targetElemPos = {top: 0, left: 0, placement: ''};

                if (placement[2]) {
                    var viewportOffset = this.viewportOffset(hostElem, appendToBody);

                    var targetElemStyle = $window.getComputedStyle(targetElem);
                    var adjustedSize = {
                        width: targetWidth + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginLeft) + this.parseStyle(targetElemStyle.marginRight))),
                        height: targetHeight + Math.round(Math.abs(this.parseStyle(targetElemStyle.marginTop) + this.parseStyle(targetElemStyle.marginBottom)))
                    };

                    placement[0] = placement[0] === 'top' && adjustedSize.height > viewportOffset.top && adjustedSize.height <= viewportOffset.bottom ? 'bottom' :
                        placement[0] === 'bottom' && adjustedSize.height > viewportOffset.bottom && adjustedSize.height <= viewportOffset.top ? 'top' :
                            placement[0] === 'left' && adjustedSize.width > viewportOffset.left && adjustedSize.width <= viewportOffset.right ? 'right' :
                                placement[0] === 'right' && adjustedSize.width > viewportOffset.right && adjustedSize.width <= viewportOffset.left ? 'left' :
                                    placement[0];

                    placement[1] = placement[1] === 'top' && adjustedSize.height - hostElemPos.height > viewportOffset.bottom && adjustedSize.height - hostElemPos.height <= viewportOffset.top ? 'bottom' :
                        placement[1] === 'bottom' && adjustedSize.height - hostElemPos.height > viewportOffset.top && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom ? 'top' :
                            placement[1] === 'left' && adjustedSize.width - hostElemPos.width > viewportOffset.right && adjustedSize.width - hostElemPos.width <= viewportOffset.left ? 'right' :
                                placement[1] === 'right' && adjustedSize.width - hostElemPos.width > viewportOffset.left && adjustedSize.width - hostElemPos.width <= viewportOffset.right ? 'left' :
                                    placement[1];

                    if (placement[1] === 'center') {
                        if (PLACEMENT_REGEX.vertical.test(placement[0])) {
                            var xOverflow = hostElemPos.width / 2 - targetWidth / 2;
                            if (viewportOffset.left + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.right) {
                                placement[1] = 'left';
                            } else if (viewportOffset.right + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.left) {
                                placement[1] = 'right';
                            }
                        } else {
                            var yOverflow = hostElemPos.height / 2 - adjustedSize.height / 2;
                            if (viewportOffset.top + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom) {
                                placement[1] = 'top';
                            } else if (viewportOffset.bottom + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.top) {
                                placement[1] = 'bottom';
                            }
                        }
                    }
                }

                switch (placement[0]) {
                    case 'top':
                        targetElemPos.top = hostElemPos.top - targetHeight;
                        break;
                    case 'bottom':
                        targetElemPos.top = hostElemPos.top + hostElemPos.height;
                        break;
                    case 'left':
                        targetElemPos.left = hostElemPos.left - targetWidth;
                        break;
                    case 'right':
                        targetElemPos.left = hostElemPos.left + hostElemPos.width;
                        break;
                }

                switch (placement[1]) {
                    case 'top':
                        targetElemPos.top = hostElemPos.top;
                        break;
                    case 'bottom':
                        targetElemPos.top = hostElemPos.top + hostElemPos.height - targetHeight;
                        break;
                    case 'left':
                        targetElemPos.left = hostElemPos.left;
                        break;
                    case 'right':
                        targetElemPos.left = hostElemPos.left + hostElemPos.width - targetWidth;
                        break;
                    case 'center':
                        if (PLACEMENT_REGEX.vertical.test(placement[0])) {
                            targetElemPos.left = hostElemPos.left + hostElemPos.width / 2 - targetWidth / 2;
                        } else {
                            targetElemPos.top = hostElemPos.top + hostElemPos.height / 2 - targetHeight / 2;
                        }
                        break;
                }

                targetElemPos.top = Math.round(targetElemPos.top);
                targetElemPos.left = Math.round(targetElemPos.left);
                targetElemPos.placement = placement[1] === 'center' ? placement[0] : placement[0] + '-' + placement[1];

                return targetElemPos;
            },

            /**
             * Provides a way to adjust the top positioning after first
             * render to correctly align element to top after content
             * rendering causes resized element height
             *
             * @param {array} placementClasses - The array of strings of classes
             * element should have.
             * @param {object} containerPosition - The object with container
             * position information
             * @param {number} initialHeight - The initial height for the elem.
             * @param {number} currentHeight - The current height for the elem.
             */
            adjustTop: function(placementClasses, containerPosition, initialHeight, currentHeight) {
                if (placementClasses.indexOf('top') !== -1 && initialHeight !== currentHeight) {
                    return {
                        top: containerPosition.top - currentHeight + 'px'
                    };
                }
            },

            /**
             * Provides a way for positioning tooltip & dropdown
             * arrows when using placement options beyond the standard
             * left, right, top, or bottom.
             *
             * @param {element} elem - The tooltip/dropdown element.
             * @param {string} placement - The placement for the elem.
             */
            positionArrow: function(elem, placement) {
                elem = this.getRawNode(elem);

                var innerElem = elem.querySelector('.tooltip-inner, .popover-inner');
                if (!innerElem) {
                    return;
                }

                var isTooltip = angular.element(innerElem).hasClass('tooltip-inner');

                var arrowElem = isTooltip ? elem.querySelector('.tooltip-arrow') : elem.querySelector('.arrow');
                if (!arrowElem) {
                    return;
                }

                var arrowCss = {
                    top: '',
                    bottom: '',
                    left: '',
                    right: ''
                };

                placement = this.parsePlacement(placement);
                if (placement[1] === 'center') {
                    // no adjustment necessary - just reset styles
                    angular.element(arrowElem).css(arrowCss);
                    return;
                }

                var borderProp = 'border-' + placement[0] + '-width';
                var borderWidth = $window.getComputedStyle(arrowElem)[borderProp];

                var borderRadiusProp = 'border-';
                if (PLACEMENT_REGEX.vertical.test(placement[0])) {
                    borderRadiusProp += placement[0] + '-' + placement[1];
                } else {
                    borderRadiusProp += placement[1] + '-' + placement[0];
                }
                borderRadiusProp += '-radius';
                var borderRadius = $window.getComputedStyle(isTooltip ? innerElem : elem)[borderRadiusProp];

                switch (placement[0]) {
                    case 'top':
                        arrowCss.bottom = isTooltip ? '0' : '-' + borderWidth;
                        break;
                    case 'bottom':
                        arrowCss.top = isTooltip ? '0' : '-' + borderWidth;
                        break;
                    case 'left':
                        arrowCss.right = isTooltip ? '0' : '-' + borderWidth;
                        break;
                    case 'right':
                        arrowCss.left = isTooltip ? '0' : '-' + borderWidth;
                        break;
                }

                arrowCss[placement[1]] = borderRadius;

                angular.element(arrowElem).css(arrowCss);
            }
        };
    }]);
angular.module('zenith.dropdown', ['zenith.position'])

    .constant('zDropdownConfig', {
        appendToOpenClass: 'z-dropdown-open',
        openClass: 'm-open'
    })

    .service('zDropdownService', ['$document', '$rootScope', function ($document, $rootScope) {
        var openScope = null;

        this.open = function (dropdownScope, element) {
            if (!openScope) {
                $document.on('click', closeDropdown);
            }

            if (openScope && openScope !== dropdownScope) {
                openScope.isOpen = false;
            }

            openScope = dropdownScope;
        };

        this.close = function (dropdownScope, element) {
            if (openScope === dropdownScope) {
                $document.off('click', closeDropdown);
                $document.off('keydown', this.keybindFilter);
                openScope = null;
            }
        };

        var closeDropdown = function (evt) {
            // This method may still be called during the same mouse event that
            // unbound this event handler. So check openScope before proceeding.
            if (!openScope) {
                return;
            }

            if (evt && openScope.getAutoClose() === 'disabled') {
                return;
            }

            if (evt && evt.which === 3) {
                return;
            }

            var toggleElement = openScope.getToggleElement();
            if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
                return;
            }

            var dropdownElement = openScope.getDropdownElement();
            if (evt && openScope.getAutoClose() === 'outsideClick' &&
                dropdownElement && dropdownElement[0].contains(evt.target)) {
                return;
            }

            openScope.focusToggleElement();
            openScope.isOpen = false;

            if (!$rootScope.$$phase) {
                openScope.$apply();
            }
        };

        this.keybindFilter = function (evt) {
            if (!openScope) {
                // see this.close as ESC could have been pressed which kills the scope so we can not proceed
                return;
            }

            var dropdownElement = openScope.getDropdownElement();
            var toggleElement = openScope.getToggleElement();
            var dropdownElementTargeted = dropdownElement && dropdownElement[0].contains(evt.target);
            var toggleElementTargeted = toggleElement && toggleElement[0].contains(evt.target);
            if (evt.which === 27) {
                evt.stopPropagation();
                openScope.focusToggleElement();
                closeDropdown();
            } else if (openScope.isKeynavEnabled() && [38, 40].indexOf(evt.which) !== -1 && openScope.isOpen && (dropdownElementTargeted || toggleElementTargeted)) {
                evt.preventDefault();
                evt.stopPropagation();
                openScope.focusDropdownEntry(evt.which);
            }
        };
    }])

    .controller('zDropdownController', ['$scope', '$element', '$attrs', '$parse', 'zDropdownConfig', 'zDropdownService', '$animate', '$zPosition', '$document', '$compile', '$templateRequest', function ($scope, $element, $attrs, $parse, dropdownConfig, zDropdownService, $animate, $position, $document, $compile, $templateRequest) {
        var self = this,
            scope = $scope.$new(), // create a child scope so we are not polluting original one
            templateScope,
            appendToOpenClass = dropdownConfig.appendToOpenClass,
            openClass = dropdownConfig.openClass,
            getIsOpen,
            setIsOpen = angular.noop,
            toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
            appendToBody = false,
            appendTo = null,
            keynavEnabled = false,
            selectedOption = null,
            body = $document.find('body');

        $element.addClass('dropdown');

        this.init = function () {
            if ($attrs.isOpen) {
                getIsOpen = $parse($attrs.isOpen);
                setIsOpen = getIsOpen.assign;

                $scope.$watch(getIsOpen, function (value) {
                    scope.isOpen = !!value;
                });
            }

            if (angular.isDefined($attrs.dropdownAppendTo)) {
                var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
                if (appendToEl) {
                    appendTo = angular.element(appendToEl);
                }
            }

            appendToBody = angular.isDefined($attrs.dropdownAppendToBody);
            keynavEnabled = angular.isDefined($attrs.keyboardNav);

            if (appendToBody && !appendTo) {
                appendTo = body;
            }

            if (appendTo && self.dropdownMenu) {
                appendTo.append(self.dropdownMenu);
                $element.on('$destroy', function handleDestroyEvent() {
                    self.dropdownMenu.remove();
                });
            }
        };

        this.toggle = function (open) {
            scope.isOpen = arguments.length ? !!open : !scope.isOpen;
            if (angular.isFunction(setIsOpen)) {
                setIsOpen(scope, scope.isOpen);
            }

            return scope.isOpen;
        };

        // Allow other directives to watch status
        this.isOpen = function () {
            return scope.isOpen;
        };

        scope.getToggleElement = function () {
            return self.toggleElement;
        };

        scope.getAutoClose = function () {
            return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
        };

        scope.getElement = function () {
            return $element;
        };

        scope.isKeynavEnabled = function () {
            return keynavEnabled;
        };

        scope.focusDropdownEntry = function (keyCode) {
            var elems = self.dropdownMenu ? //If append to body is used.
                angular.element(self.dropdownMenu).find('a') :
                $element.find('ul').eq(0).find('a');

            switch (keyCode) {
                case 40: {
                    if (!angular.isNumber(self.selectedOption)) {
                        self.selectedOption = 0;
                    } else {
                        self.selectedOption = self.selectedOption === elems.length - 1 ?
                            self.selectedOption :
                        self.selectedOption + 1;
                    }
                    break;
                }
                case 38: {
                    if (!angular.isNumber(self.selectedOption)) {
                        self.selectedOption = elems.length - 1;
                    } else {
                        self.selectedOption = self.selectedOption === 0 ?
                            0 : self.selectedOption - 1;
                    }
                    break;
                }
            }
            elems[self.selectedOption].focus();
        };

        scope.getDropdownElement = function () {
            return self.dropdownMenu;
        };

        scope.focusToggleElement = function () {
            if (self.toggleElement) {
                self.toggleElement[0].focus();
            }
        };

        scope.$watch('isOpen', function (isOpen, wasOpen) {
            if (appendTo && self.dropdownMenu) {
                var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
                    css,
                    rightalign,
                    scrollbarPadding,
                    scrollbarWidth = 0;

                css = {
                    top: pos.top + 'px',
                    display: isOpen ? 'block' : 'none'
                };

                rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
                if (!rightalign) {
                    css.left = pos.left + 'px';
                    css.right = 'auto';
                } else {
                    css.left = 'auto';
                    scrollbarPadding = $position.scrollbarPadding(appendTo);

                    if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
                        scrollbarWidth = scrollbarPadding.scrollbarWidth;
                    }

                    css.right = window.innerWidth - scrollbarWidth -
                        (pos.left + $element.prop('offsetWidth')) + 'px';
                }

                // Need to adjust our positioning to be relative to the appendTo container
                // if it's not the body element
                if (!appendToBody) {
                    var appendOffset = $position.offset(appendTo);

                    css.top = pos.top - appendOffset.top + 'px';

                    if (!rightalign) {
                        css.left = pos.left - appendOffset.left + 'px';
                    } else {
                        css.right = window.innerWidth -
                            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
                    }
                }

                self.dropdownMenu.css(css);
            }

            var openContainer = appendTo ? appendTo : $element;
            var hasOpenClass = openContainer.hasClass(appendTo ? appendToOpenClass : openClass);

            if (hasOpenClass === !isOpen) {
                $animate[isOpen ? 'addClass' : 'removeClass'](openContainer, appendTo ? appendToOpenClass : openClass).then(function () {
                    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
                        toggleInvoker($scope, {open: !!isOpen});
                    }
                });
            }

            if (isOpen) {
                if (self.dropdownMenuTemplateUrl) {
                    $templateRequest(self.dropdownMenuTemplateUrl).then(function (tplContent) {
                        templateScope = scope.$new();
                        $compile(tplContent.trim())(templateScope, function (dropdownElement) {
                            var newEl = dropdownElement;
                            self.dropdownMenu.replaceWith(newEl);
                            self.dropdownMenu = newEl;
                            $document.on('keydown', zDropdownService.keybindFilter);
                        });
                    });
                } else {
                    $document.on('keydown', zDropdownService.keybindFilter);
                }

                scope.focusToggleElement();
                zDropdownService.open(scope, $element);
            } else {
                zDropdownService.close(scope, $element);
                if (self.dropdownMenuTemplateUrl) {
                    if (templateScope) {
                        templateScope.$destroy();
                    }
                    var newEl = angular.element('<ul class="dropdown-menu"></ul>');
                    self.dropdownMenu.replaceWith(newEl);
                    self.dropdownMenu = newEl;
                }

                self.selectedOption = null;
            }

            if (angular.isFunction(setIsOpen)) {
                setIsOpen($scope, isOpen);
            }
        });
    }])

    .directive('zDropdown', function () {
        return {
            controller: 'zDropdownController',
            link: function (scope, element, attrs, dropdownCtrl) {
                dropdownCtrl.init();
            }
        };
    })

    .directive('zDropdownMenu', function () {
        return {
            restrict: 'A',
            require: '?^zDropdown',
            link: function (scope, element, attrs, dropdownCtrl) {
                if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
                    return;
                }

                element.addClass('dropdown-menu');

                var tplUrl = attrs.templateUrl;
                if (tplUrl) {
                    dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
                }

                if (!dropdownCtrl.dropdownMenu) {
                    dropdownCtrl.dropdownMenu = element;
                }
            }
        };
    })

    .directive('zDropdownToggle', function () {
        return {
            require: '?^zDropdown',
            link: function (scope, element, attrs, dropdownCtrl) {
                if (!dropdownCtrl) {
                    return;
                }

                element.addClass('dropdown-toggle');

                dropdownCtrl.toggleElement = element;

                var toggleDropdown = function (event) {
                    event.preventDefault();

                    if (!element.hasClass('disabled') && !attrs.disabled) {
                        scope.$apply(function () {
                            dropdownCtrl.toggle();
                        });
                    }
                };

                element.bind('click', toggleDropdown);

                // WAI-ARIA
                element.attr({'aria-haspopup': true, 'aria-expanded': false});
                scope.$watch(dropdownCtrl.isOpen, function (isOpen) {
                    element.attr('aria-expanded', !!isOpen);
                });

                scope.$on('$destroy', function () {
                    element.unbind('click', toggleDropdown);
                });
            }
        };
    });
(function () {
    angular.module('zenith.filters', [])
        .directive('zFilters', [function () {
            return {
                restrict: 'E',
                templateUrl: '/zenith/src/directives/filters/filters.template.html',
                replace: true,
                transclude: true,
                scope: {
                    activeFilter: '=',
                    getCount: '&'
                },
                controller: ['$scope', function ($scope) {
                    var createFilter = function (key, value, caption) {
                        if (!key) return null;

                        var filter = {};
                        filter[key] = value;
                        filter.$caption = caption;
                        return filter;
                    };

                    this.setActive = function (key, value, caption) {
                        $scope.activeFilter = createFilter(key, value, caption);
                    };

                    this.getCount = function (key, value) {
                        return $scope.getCount({filter: createFilter(key, value)});
                    };

                    this.isActive = function (key, value) {
                        if (key) {
                            return $scope.activeFilter && $scope.activeFilter[key] == value;
                        } else {
                            return !$scope.activeFilter;
                        }
                    };
                }]
            };
        }]);
})();
/**
 * @ngdoc directive
 * @name zenith.thead:zThead
 * @element thead
 * @param {expression} sortDesc Data source sort order
 * @param {expression} sortKey Data source sort key
 * @restrict A
 * @description
 * Table head directive for sorting
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <table class="table">
 <thead class="table-head" z-thead sort-key="accounts.sortKey" sort-desc="accounts.sortDesc">
 <tr>
 <th>
 <z-select-array array="accountTypes" selection="selectedItems"></z-select-array>
 </th>
 <th z-th key="name" auto-sort="asc">Account type</th>
 </tr>
 </thead>
 <tbody class="table-body">
 <tr ng-repeat="account in accounts.currentPage">
 <td>
 <z-select-item item="account" selection="selectedItems"></z-select-item>
 </td>
 <td>{{ account.name }}</td>
 </tr>
 </tbody>
 </table>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.thead', [])
        .directive('zThead', zThead);

    function zThead() {
        var directive = {
            restrict: 'A',
            replace: false,
            transclude: false,
            scope: {
                sortDesc: '=',
                sortKey: '='
            },
            controller: TheadController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

    function TheadController() {
        var ctrl = this;

        ctrl.sortBy = function (key) {
            if (ctrl.sortKey == key) {
                ctrl.sortDesc = !ctrl.sortDesc;
            } else {
                ctrl.sortKey = key;
                ctrl.sortDesc = false;
            }
        };

        ctrl.getSortKey = function () {
            return ctrl.sortKey;
        };
    }
})();


/**
 * @ngdoc directive
 * @name zenith.validateField:zValidateField
 * @element z-validate-field
 * @restrict A
 * @description
 * Part of form validation mechanism. It communicates with parent z-validate-form directive to inform it about valid/invalid inputs.
 *
 * @example
 <example module="example">
 <file name="index.html">
 <div ng-controller="exampleController">
 <form z-validate-form novalidate>
 <input type="text" ng-model="name" name="name" z-validate-field required>
 <z-validation error="required" field="name">Name is required</z-validation>
 <button class="btn m-blue">Save</button>
 <form>
 </div>
 </file>
 </example>
 */

(function () {
    angular.module('zenith.validateField', [])
        .directive('zValidateField', [zValidateField]);

    function zValidateField() {
        var directive = {
            restrict: 'A',
            require: ['^?zValidateForm', '?ngModel'],
            scope: true,
            controller: ValidateFieldController,
            controllerAs: 'vm',
            bindToController: true,
            link: link
        };

        return directive;

        function link(scope, element, attrs, controllers) {

            var validateFormController = controllers[0];
            if (validateFormController !== null) {


                var ngModelCtrl = controllers[1];
                var invalidClass = 'validation-invalid';

                if (ngModelCtrl.$options == null) {
                    ngModelCtrl.$options = {
                        allowInvalid: true,
                        updateOnDefault: true
                    };
                } else {
                    ngModelCtrl.$options.allowInvalid = true;
                    ngModelCtrl.$options.updateOnDefault = true;
                }

                var valueWatcher = scope.$watch(attrs.ngModel, function (nv, ov) {
                    if (!angular.equals(nv, ov)) {
                        element.removeClass(invalidClass);
                        validateFormController.hideAllFieldValidations(ngModelCtrl.$name);
                    }
                });


                var validationWatcher = scope.$watch(attrs.zValidateField, function (nv) {
                    for (var key in nv) {
                        if (nv.hasOwnProperty(key)) {
                            ngModelCtrl.$setValidity(key, !nv[key]);
                            if (!nv[key]) {
                                element.removeClass(invalidClass);
                                validateFormController.hideAllFieldValidations(ngModelCtrl.$name);
                            }
                        }
                    }
                });
                scope.setValidityStyle = function () {
                    if (ngModelCtrl.$invalid) {
                        element.addClass(invalidClass);
                    } else {
                        element.removeClass(invalidClass);
                    }
                };
                scope.getFirstError = function () {
                    var error = Object.keys(ngModelCtrl.$error)[0];
                    if (error !== undefined) {
                        return error;
                    }
                };
                scope.isInvalid = function () {
                    return ngModelCtrl.$invalid;
                };
                scope.getName = function () {
                    return ngModelCtrl.$name;
                };
                validateFormController.addField(scope, element, attrs, ngModelCtrl);
                // Element focus and blur
                element.on('focus', function () {
                    if (element.hasClass(invalidClass)) {
                        validateFormController.showValidation(ngModelCtrl.$name, scope.getFirstError());
                        scope.$apply();
                    }
                });
                if (element[0].attributes['ng-attr-focus-element']) {
                    scope.$watch(function () {
                        return element[0].attributes['focus-element'];
                    }, function (nv, ov) {
                        $(nv.value).on('focus', function () {
                            if (element.hasClass(invalidClass)) {
                                validateFormController.showValidation(ngModelCtrl.$name, scope.getFirstError());
                            }
                        }).on('blur', function () {
                            validateFormController.hideAllFieldValidations(ngModelCtrl.$name);
                        });
                    });

                }

                element.on('blur', function () {
                    validateFormController.hideAllFieldValidations(ngModelCtrl.$name);
                });
            }
            scope.$on("$destroy", function () {
                if (validationWatcher) {
                    validationWatcher();
                }
                if (valueWatcher) {
                    valueWatcher();
                }
            });
        }
    }

    function ValidateFieldController($scope, $element) {
        var vm = this;
    }

})();
// Work in progress
(function () {
    angular.module('zenith.validateFile', [])
        .directive('zValidateFile', [zValidateFile]);

    function zValidateFile() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ngModel) {

            ngModel.$render = function () {
                ngModel.$setViewValue(el.val());
            };

            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$render();
                });
            });
        }
    }

})();
(function () {
    angular.module('zenith.validateForm', [])
        .directive('zValidateForm', [zValidateForm]);

    function zValidateForm() {
        var directive = {
            restrict: 'A',
            controller: ['$filter', ValidateFormController],
            controllerAs: 'vm',
            bindToController: true,
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            element.on('submit', function () {
                ctrl.formSubmit();
            });
            ctrl.formAttrs = attrs;
        }
    }

    function ValidateFormController($filter) {
        var vm = this,
            fields = [],
            validations = [];

        // Ctrl methods
        vm.formSubmit = formSubmit;
        vm.addField = addField;
        vm.addValidation = addValidation;
        vm.showValidation = showValidation;
        vm.hideValidation = hideValidation;
        vm.hideAllFieldValidations = hideAllFieldValidations;
        vm.hideAllValidations = hideAllValidations;

        // Methods
        function addField(scope, element, model) {
            fields.push({
                scope: scope,
                element: element,
                model: model
            });
        }

        function addValidation(validation) {
            validations.push(validation);
            validation.scope.hideValidation();
        }

        function formSubmit() {
            hideAllValidations();
            var firstInvalidField;
            var reOrdered = $filter('orderBy')(fields, function(field) {
                return $("[z-validate-field]").index(field.element);
            });
            angular.forEach(reOrdered, function (field) {
                if (field.scope.isInvalid()) {
                    var error = field.scope.getFirstError();
                    var name = field.scope.getName();
                    if (error) {
                        field.scope.setValidityStyle();
                        if (!firstInvalidField) {
                            firstInvalidField = field;
                            if (angular.isDefined(field.element[0].attributes['focus-element'])) {
                                $(field.element[0].attributes['focus-element'].value).focus();
                            } else {
                                field.element.focus();
                            }
                            showValidation(name, error);
                        }
                    }
                }
            });
        }

        function showValidation(fieldName, error) {
            angular.forEach(validations, function (validation) {
                if (validation.field === fieldName && validation.error === error) {
                    validation.scope.showValidation();
                }
            });
        }

        function hideValidation(fieldName, error) {
            angular.forEach(validations, function (validation) {
                if (validation.field === fieldName && validation.error === error) {
                    validation.scope.hideValidation();
                }
            });
        }

        function hideAllFieldValidations(fieldName) {
            angular.forEach(validations, function (validation) {
                if (validation.field === fieldName) {
                    validation.scope.hideValidation();
                }
            });
        }

        function hideAllValidations() {
            angular.forEach(validations, function (validation) {
                validation.scope.hideValidation();
            });
        }
    }

})();
(function () {
    angular.module('zenith.customFilter',[])
        .filter('customSearch', ['$filter', function ($filter) {
            return function (items, search, fields) {
                var filtered = [];

                var copyFields = function (original) {
                    var copy = {};

                    angular.forEach(fields, function (field) {
                        copy[field] = original[field];
                    });

                    return copy;
                };

                angular.forEach(items, function (item) {
                    var copy = copyFields(item);

                    if ($filter('filter')([copy], search).length === 1) {
                        filtered.push(item);
                    }
                });

                return filtered;
            };
        }]);
})()

/**
 * @ngdoc filter
 * @name zenith.start:start
 * @description
 * Filter used in pagination. Makes an array to start with particular index.
 */

angular.module('zenith.start', [])
    .filter('start', function () {
        return function (input, start) {
            if (!input) return [];
            var out = [];
            var i;
            for (i = start - 1; i < input.length; i++) {
                out.push(input[i]);
            }
            return out;
        };
    });


/**
 * @ngdoc service
 * @name zenith.service:clientDataSource
 * @description
 * Generates data object from an array for displaying data in table with pagination, filters, etc. Works on client.
 */

angular
    .module('zenith.clientDataSource', [])
    .factory('clientDataSource', ['$rootScope', '$filter', '$q', function ($rootScope, $filter, $q) {
        return function (data, searchFields) {
            var self = this;
            this.search = '';
            this.filter = null;
            this.currentPage = [];
            this.limit = 10;
            this.total = 0;
            this.start = 1;
            this.ready = false;
            this.sortKey = null;
            this.sortDesc = false;
            this.customComparers = { };
            this.searchFields = searchFields;

            this.addCustomComparer = function (key, comparer) {
                self.customComparers[key] = comparer;
            };

            this.refresh = function () {
                if (angular.isUndefined(self.data)) return;

                this.ready = false;

                var f = angular.copy(self.filter);

                if (f) delete f['$caption'];

                var found;
                if (self.searchFields) {
                    // debugger
                    found = $filter('customSearch')(self.data, self.search, self.searchFields);

                } else {
                    found = $filter('filter')(self.data, self.search);
                }

                var filtered;
                 if (f) {
                    filtered = $filter('filter')(found, f);
                } else {
                    filtered = found;
                }
                self.filtered = filtered;
                self.total = filtered.length;

                var sorted;
                if (self.customComparers[self.sortKey]) {
                    sorted = filtered.sort(function (a, b) {
                        var result = self.customComparers[self.sortKey](a, b);
                        return self.sortDesc ? -result : result;
                    });
                } else {
                    sorted = $filter('orderBy')(filtered, self.sortKey, self.sortDesc);
                }

                var paged = $filter('start')(sorted, self.start);
                if (self.limit) {
                    paged = $filter('limitTo')(paged, self.limit);
                }

                self.currentPage = paged;
                this.ready = true;
            };

            this.getFilterCount = function (filter) {
                var filtered = $filter('filter')(self.data, filter);
                return filtered ? filtered.length : undefined;
            };

            this.getTotal = function () {
                return this.total;
            };

            $q.when(data).then(function (d) {
                self.data = d;
            });

            $rootScope.$watchCollection(function () {
                return [self.search, self.filter, self.limit, self.data, self.sortKey, self.sortDesc];
            }, function () {
                self.start = 1;
                self.refresh();
            });

            // watch multiple filters
            $rootScope.$watch(function () {
                return self.filter;
            }, function () {
                self.start = 1;
                self.refresh();
            }, true);

            $rootScope.$watch(function () {
                return self.start;
            }, function () {
                self.refresh();
            });

            $rootScope.$watch(function () {
                return self.data ? self.data.length : undefined;
            }, function () {
                self.refresh();
            });
        };
    }]);

/**
 * @ngdoc service
 * @name zenith.service:passwordGenerator
 * @description
 * Service for generation a strong password
 */

(function() {
    angular.module('zenith.passwordGenerator', [])
        .service('passwordGeneratorService', passwordGeneratorService);

        function passwordGeneratorService() {
            this.getPassword = function (plength) {
                var keylistalpha = "abcdefghijklmnopqrstuvwxyz";
                var keylistcaps = "QWERTYUIOPASDFGHJKLZXCVBNM";
                var keylistint = "123456789";
                var keylistspec = "!$#%";
                var temp = '';
                var len = plength / 2;
                var len = len - 1;
                var lenspec = plength - len - len;

                for (i = 0; i < len; i++) temp += keylistalpha.charAt(Math.floor(Math.random() * keylistalpha.length));

                for (i = 0; i < lenspec; i++) temp += keylistspec.charAt(Math.floor(Math.random() * keylistspec.length));

                for (i = 0; i < len; i++) temp += keylistint.charAt(Math.floor(Math.random() * keylistint.length));

                for (i = 0; i < len; i++) temp += keylistcaps.charAt(Math.floor(Math.random() * keylistint.length));

                temp = temp.split('').sort(function () { return 0.5 - Math.random() }).join('');

                return temp;
            };
        }
})();

/**
 * @ngdoc service
 * @name zenith.service:passwordPolicy
 * @description
 * Service for provide password policy options
 */

(function() {
    angular.module('zenith.passwordPolicy', [])
        .service('passwordPolicyService', passwordPolicyService);

    function passwordPolicyService() {
        this.getPasswordOptions = function (model) {
            var password = model || '',
                special_chars = /[#!$%]/,
                letters = /[abcdefghijklmnopqrstuvwxyz]/,
                caps = /[QWERTYUIOPASDFGHJKLZXCVBNM]/,
                numbers = /[0123456789]/;

            return [
                { description: 'Min 8 characters', isVeryfied: (password.length >= 8) },
                { description: 'Lower case characters (a-z)', isVeryfied: letters.test(password )},
                { description: 'Upper case characters (A-Z)', isVeryfied: caps.test(password) },
                { description: 'Number (0-9)', isVeryfied: numbers.test(password) },
                { description: 'Special charcters (! $ # %)', isVeryfied:  special_chars.test(password) },
                { description: 'Not include username', isVeryfied: true },
                { description: 'Not use 4 last passwords', isVeryfied: true },
            ]
        };

        this.isAllPoliciesVerified = function (model) {
            return  Math.random() < 0.9 ? true : false
        };
    }
})();

/**
 * @ngdoc service
 * @name zenith.service:passwordStrength
 * @description
 * Service for estimation of password strength
 */

(function() {
    angular.module('zenith.passwordStrength', [])
        .service('passwordStrengthService', passwordStrengthService);

    function passwordStrengthService() {
        this.getPasswordStrength = function (model) {
                var strength = 0;
                var options = [
                    { check: false },
                    { check: false },
                    { check: false },
                    { check: false },
                    { check: false },
                    { check: false },
                ]

                var password = model || '',
                    special_chars = /[#!$%]/,
                    letters = /[abcdefghijklmnopqrstuvwxyz]/,
                    caps = /[QWERTYUIOPASDFGHJKLZXCVBNM]/,
                    numbers = /[0123456789]/;

                options[0].check = (password.length > 0);
                options[1].check = (password.length >= 8);
                options[2].check = letters.test(password);
                options[3].check = caps.test(password);
                options[4].check = numbers.test(password);
                options[5].check = special_chars.test(password);


                var percent = [];

                for (var i = 0; i < options.length; i++) {
                    if (options[i].check) {
                        percent.push(options[i].check)
                    }
                    else {
                        percent.splice(1, 1);
                    }
                }

                switch (percent.length) {
                    case 1:
                        strength = 1;
                        break;
                    case 2:
                        strength = 1;
                        break;
                    case 3:
                        strength = 1;
                        break;
                    case 4:
                        strength = 1;
                        break;
                    case 5:
                        strength = 1;
                        break;
                    case 6:
                        strength = 5;
                        break;
                    default: strength = 0;

                }
                return strength;
            };
        }
})();

// Imported from UI Bootstrap. Used in dropdown directive.
angular.module('zenith.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
    .factory('$position', ['$document', '$window', function ($document, $window) {

        function getStyle(el, cssprop) {
            if (el.currentStyle) { //IE
                return el.currentStyle[cssprop];
            } else if ($window.getComputedStyle) {
                return $window.getComputedStyle(el)[cssprop];
            }
            // finally try and get inline style
            return el.style[cssprop];
        }

        /**
         * Checks if a given element is statically positioned
         * @param element - raw DOM element
         */
        function isStaticPositioned(element) {
            return (getStyle(element, 'position') || 'static' ) === 'static';
        }

        /**
         * returns the closest, non-statically positioned parentOffset of a given element
         * @param element
         */
        var parentOffsetEl = function (element) {
            var docDomEl = $document[0];
            var offsetParent = element.offsetParent || docDomEl;
            while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docDomEl;
        };

        return {
            /**
             * Provides read-only equivalent of jQuery's position function:
             * http://api.jquery.com/position/
             */
            position: function (element) {
                var elBCR = this.offset(element);
                var offsetParentBCR = { top: 0, left: 0 };
                var offsetParentEl = parentOffsetEl(element[0]);
                if (offsetParentEl != $document[0]) {
                    offsetParentBCR = this.offset(angular.element(offsetParentEl));
                    offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                    offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
                }

                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: elBCR.top - offsetParentBCR.top,
                    left: elBCR.left - offsetParentBCR.left
                };
            },

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * http://api.jquery.com/offset/
             */
            offset: function (element) {
                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
                    left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
                };
            },

            /**
             * Provides coordinates for the targetEl in relation to hostEl
             */
            positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

                var positionStrParts = positionStr.split('-');
                var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

                var hostElPos,
                    targetElWidth,
                    targetElHeight,
                    targetElPos;

                hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

                targetElWidth = targetEl.prop('offsetWidth');
                targetElHeight = targetEl.prop('offsetHeight');

                var shiftWidth = {
                    center: function () {
                        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
                    },
                    left: function () {
                        return hostElPos.left;
                    },
                    right: function () {
                        return hostElPos.left + hostElPos.width;
                    }
                };

                var shiftHeight = {
                    center: function () {
                        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
                    },
                    top: function () {
                        return hostElPos.top;
                    },
                    bottom: function () {
                        return hostElPos.top + hostElPos.height;
                    }
                };

                switch (pos0) {
                    case 'right':
                        targetElPos = {
                            top: shiftHeight[pos1](),
                            left: shiftWidth[pos0]()
                        };
                        break;
                    case 'left':
                        targetElPos = {
                            top: shiftHeight[pos1](),
                            left: hostElPos.left - targetElWidth
                        };
                        break;
                    case 'bottom':
                        targetElPos = {
                            top: shiftHeight[pos0](),
                            left: shiftWidth[pos1]()
                        };
                        break;
                    default:
                        targetElPos = {
                            top: hostElPos.top - targetElHeight,
                            left: shiftWidth[pos1]()
                        };
                        break;
                }

                return targetElPos;
            }
        };
    }]);
/**
 * @ngdoc service
 * @name zenith.serverDataSource:serverDataSource
 * @description
 * Generates data object from an array for displaying data in table with pagination, filters, etc. Works with server data provider.
 */

angular
    .module('zenith.serverDataSource', [])
    .factory('serverDataSource', ['$rootScope', '$cacheFactory', '$q', function ($rootScope, $cacheFactory, $q) {
        return function (dataProvider, searchFields) {
            var self = this;

            self.search = '';
            self.currentPage = [];
            self.limit = 10;
            self.knowTotal = true;
            self.total = 0;
            self.start = 1;
            self.ready = false;
            self.sortKey = null;
            self.sortDesc = false;
            self.searchFields = searchFields;
            self.enableCaching = false;
            self.cacheCapacity = 10;

            var cacheFactoryName = 'datasource-server-' + (Math.random() + 1).toString(36).slice(2);
            self.cache = $cacheFactory(cacheFactoryName, { capacity: self.cacheCapacity });

            self.refresh = function () {
                self.ready = false;

                var options = {
                    hasLimit: !!self.limit,
                    sortKey: self.sortKey,
                    sortDesc: self.sortDesc,
                    search: self.search,
                    searchFields: self.searchFields
                };

                if (options.hasLimit) {
                    options.start = self.start;
                    options.limit = self.limit;
                } else {
                    options.start = 1
                }

                var getData = dataProvider.get(options);
                if (self.enableCaching) {
                    var cacheKey = angular.toJson(options);
                    var cached = self.cache.get(cacheKey);
                    if (cached !== undefined) {
                        getData = cached;
                    }
                }

                $q.when(getData).then(
                    function (page) {
                        if (self.enableCaching && cached === undefined) {
                            self.cache.put(cacheKey, page);
                        }

                        self.currentPage = page;

                        if (!self.knowTotal && self.currentPage.length < self.limit) {
                            self.total = self.start + self.currentPage.length - 1;
                        }

                        self.ready = true;
                    },
                    function (error) {
                        self.ready = true;
                    }
                );
            };

            self.reload = function () {
                self.ready = false;

                $q.when(dataProvider.getTotal({
                    search: self.search,
                    searchFields: self.searchFields
                })).then(
                    function (total) {
                        self.total = total;
                        self.knowTotal = !angular.isUndefined(total);
                        self.refresh();
                    },
                    function (error) {
                        self.ready = true;
                    });
            };

            self.reloadActive = false;
            $rootScope.$watchCollection(function () {
                return [self.searchFields, self.search];
            }, function () {
                if (self.reloadActive) {
                    self.reload();
                } else {
                    self.reloadActive = true;
                }
            });

            self.refreshActive = false;
            $rootScope.$watchCollection(function () {
                return [self.sortKey, self.sortDesc, self.limit, self.start];
            }, function () {
                if (self.refreshActive) {
                    self.refresh();
                } else {
                    self.refreshActive = true;
                }
            });
        };
    }]);
