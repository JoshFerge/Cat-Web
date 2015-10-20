describe('Cat Search', function() {
  beforeEach(function() {
    browser.get('http:joshferge.github.io/cat-web');
    
  });

  it('Correct Title', function() {
    expect(browser.getTitle()).toEqual('Meow Search');
  });

  it('Must Provide Input to Search', function() {
    var search = element(by.model('user.name'));
    
    element(by.id('submit')).click();
    expect(browser.getTitle()).toEqual('Meow Search');
    
  });

  it('Page Switches', function() {
    var search = element(by.model('user.name'));
    search.sendKeys(1);
    element(by.id('submit')).click();
    expect(browser.getTitle()).toEqual('Cats');

  });

  it('verify images loaded on front page', function () {
    browser.executeAsyncScript(function (callback) {
        var imgs = document.getElementsByTagName('img'),
            loaded = 0;
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].naturalWidth > 0) {
                loaded = loaded + 1;
            }
            else {
              console.log(imgs[i].src)
            }
        };
        callback(imgs.length - loaded);
     }).then(function (brokenImagesCount) {
        expect(brokenImagesCount).toBe(0);
    });
  });

  it('verify images loaded on search page', function () {
    var search = element(by.model('user.name'));
    search.sendKeys(1);
    element(by.id('submit')).click();
    

    browser.sleep(2000)
    browser.executeAsyncScript(function (callback) {
        var imgs = document.getElementsByTagName('img'), loaded = 0;
        console.log(imgs.length)
        console.log("vacon")
        var broken = [];
        
        for (var i = 0; i < imgs.length; i++) {
            console.log("Test")
            if (imgs[i].naturalWidth > 0) {
                loaded = loaded + 1;
            }
            else {
              broken.push(imgs[i].src);
            };
        };
        callback(broken);
     }).then(function (brokenImagesCount) {
        console.log(brokenImagesCount);
        expect(brokenImagesCount.length).toBe(1);
    });
  });


  


});