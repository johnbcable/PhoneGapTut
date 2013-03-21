var app = {

    showAlert: function(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title +": " + message) : message);
        }
    },

    registerEvents: function() {
        var self = this;
        // Check if the browser supports touch events
        if (document.documentElement.hasOwnproperty('ontouchstart')) {
            // yes, so register the touch event listener
            $('body').on('touchstart', 'a', function(event) {
                $(event.target),addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // no, so register the mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target),addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },

    initialize: function() {
        var self = this;
        this.store = new MemoryStore( function(){
            // self.showAlert('Store initialised', 'Info');
            $('body').html(new HomeView(self.store).render().el);
        });
//        $('.search-key').on('keyup', $.proxy(this.findByName, this));
//        this.homeTpl = Handlebars.compile($("#home-tpl").html());
//        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    }

};

app.initialize();