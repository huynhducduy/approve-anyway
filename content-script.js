chrome.storage.sync.get(["matches"], function ({ matches }) {
    var sites = [];
    if (matches) sites = matches.split(';').map(m => new RegExp('/'+ m + '/'));

    var matched = false;
    for (var site of sites) {
        if (site.test(document.location.href)) {
            matched = true;
            break;
        }
    }

    if (matched === true) {

        function isFunction(functionToCheck) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        }

        function approveThisPR() {
            document.querySelector("input[name='pull_request_review[event]']").value = 'approve';document.querySelector(".btn.btn-sm.btn-primary.float-left.mr-1").click();
        }

        function insertBtn(node) {
            if (isFunction(node.querySelector)) {
                var reviewBtn = node.querySelector('.diffbar-item.dropdown.js-reviews-container');

                if (reviewBtn) {
                    reviewBtn.insertAdjacentHTML('afterend', '<div class="diffbar-item dropdown js-reviews-container" id="approve-anyway"><details class="details-reset details-overlay d-inline-block position-relative"><summary class="btn btn-sm btn-primary js-reviews-toggle"><span class="js-review-changes">Approve<span class="hide-sm hide-md"> anyway</span></span></summary></details></div>')

                    node.querySelector('#approve-anyway').addEventListener('click', approveThisPR);
                }
            }
        }

        insertBtn(document);

        var observeDOM = (function(){
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

            return function( obj, callback ){
                if( !obj || obj.nodeType !== 1 ) return;

                if( MutationObserver ){
                    var mutationObserver = new MutationObserver(callback)

                    mutationObserver.observe( obj, { childList:true, subtree:true })
                    return mutationObserver
                }

                else if( window.addEventListener ){
                    obj.addEventListener('DOMNodeInserted', callback, false)
                    obj.addEventListener('DOMNodeRemoved', callback, false)
                }
            }
        })();

        observeDOM(document.querySelector('body'), function (m) {

            if (!document.getElementById('approve-anyway')) {
                m.forEach(record => record.addedNodes.forEach(node => insertBtn(node)));
            } else {
                document.getElementById('approve-anyway').addEventListener('click', approveThisPR);
            }
        })
    }
});
