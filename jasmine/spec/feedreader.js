/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         * 'Expected 0 not to be 0.'
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures each feed in the allFeeds object has a URL defined
         * and not empty.
         */

        it('has url defined and not empty', function(){
            allFeeds.forEach(function(feedI){
                expect(feedI.url).toBeDefined();
                expect(feedI.url).toContain('http');
                expect(feedI.url.length).not.toBe(0);
            });
        });

        /* Ensures each feed in the allFeeds object has a name defined
         * and not empty.
         */

        it('has name defined and not empty', function(){
            allFeeds.forEach(function(feedI){
                 expect(feedI.name).toBeDefined();
                 expect(feedI.name.length).not.toBe(0);
            });
        });
    });

        // Check if menu element is hidden by default.

    describe('The menu', function(){
        let body = document.getElementsByTagName('BODY')[0];
        it('menu is hidden', function(){
            expect(body).toHaveClass('menu-hidden');
        });

         /* Check if menu changes visibility when the menu icon is clicked.
         This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('changes visibility', function(){
            $('.menu-icon-link').click();
            expect(body).not.toHaveClass('menu-hidden');
            $('.menu-icon-link').click();
            expect(body).toHaveClass('menu-hidden');
        });
    });

        /* test if when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('is not empty', function(){
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

        /* test if when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */

    describe('New Feed Selection', function(){
        let oldFeed, newFeed;
        beforeEach(function(done){
            loadFeed(0, function(){
                oldFeed = $(".feed").html();
                loadFeed(1, function(){
                    newFeed = $(".feed").html();
                    done();
                });
            });
        });

        it('update content', function(){
            expect(newFeed).not.toBe(oldFeed);
        });
    });
}());
