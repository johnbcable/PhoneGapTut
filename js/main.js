var app = {

    showAlert: function(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title +": " + message) : message);
        }
    },

    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    },

    registerEvents: function() {
        var self = this;
        // Check if the browser supports touch events
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // yes, so register the touch event listener
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // no, so register the mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
        $(window).on('hashchange', $.proxy(this.route, this));
    },

    initialize: function() {
        var self = this;
        var detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        this.store = new LocalStorageStore( function() {
            // self.showAlert('Store initialised', 'Info');
            // $('body').html(new HomeView(self.store).render().el);
            self.route();
        });
//        $('.search-key').on('keyup', $.proxy(this.findByName, this));
//        this.homeTpl = Handlebars.compile($("#home-tpl").html());
//        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());


    }

};

app.initialize();