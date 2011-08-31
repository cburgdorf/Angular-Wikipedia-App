/* App Controllers */

App.Controllers.SearchController = function (wikipediaService) {
    var self = this;
  
    self.searchTerm = "";
  
    self.searchResults = [];

    /*
     The following code deals with:
     
     - throttleing the user input (we don't want to query the wikipedia API on each
     key stroke but rather when the user *stopped typing*)
     
     - filtering duplicates (eg. user types "house" (waits 500ms) types another letter and removes it
     immediatly again which would normaly result into another query with "house" even if thats
     what we are already on)
     
     - querying the service
     
     - dealing with out of order responses (when you query a server multiple times so that you have
         multiple requests "in flight", you can never be sure that the response will arrive in order. 
         The "Switch" Operator will make sure that everything will be fine.)
     */

    Rx.Observable.FromAngularScope(self, "searchTerm")
                 .Throttle(500)
                 .DistinctUntilChanged()
                 .Select(wikipediaService.search)
                 .Switch()
                 .ToOutputProperty(self, "searchResults");
}
App.Controllers.SearchController.$inject = ['wikipediaService'];