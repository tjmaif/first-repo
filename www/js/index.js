/*

highlight v5

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};

/* PLEASE DO NOT HOTLINK MY FILES, THANK YOU. */




/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//
//app.initialize();

//$(document).bind('pagechange', function() {
//    alert("yoyoyo");
//} );

sourceTable = new Array();
var firstTime = true;
    
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


function createSearch() {
    new $.nd2Search({
      placeholder : "Rechercher",   // Placeholder in the search field
      defaultIcon : "globe-alt",  // optional: icon | null
      source : sourceTable,   // autocomplete : option-source
      fn : function(result) { // this function will be executed when a valid result item is selected
        // redirection et remise à 0 de la recherche
        $.mobile.changePage("#"+result[0]);
        console.log(result);
        $('#'+result[0]).removeHighlight();
        $('#'+result[0]).highlight(result[1]);
        $(".nd2-search-button").remove();
        $(".nd2-search-input").remove();
        $(".nd2-search-back-button").remove();
      }
    });
}

$(document).bind('pagechange', function() {
    
if (firstTime) {
    
    $(".searchable").each(function() {
        var papaID = $(this).parent("div").attr("id");
        var partName = $(this).find("h2").text();
        if ( papaID.indexOf("moins25") > -1 ) {
            var iconAge = 'ico-25'
        } else {
            if ( papaID.indexOf("plus25") > -1 ) {
                var iconAge = 'ico25-55'
            } else {
                if ( papaID.indexOf("plus55") > -1 ) {
                    var iconAge = 'ico-55'
                }
            }
        };
        // recuperation et formatage du texte
        var str = $(this).text();
        var mapObj = {a:" "};
        str = str.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, ' ');
        var table = str.split(" ");
        table.clean("").clean("\u000d").clean("\r").clean("\u000a").clean("\n");

        // creation de l'objet poru autocomplete
        for (var i = 0; i < table.length; i++) {
            var val = [papaID, table[i]];
            var term = { label : table[i] , value : val , icon : iconAge, cate : partName };
            sourceTable.push(term);
        };
//        alert( sourceTable[20] );
    //    console.dir(sourceTable)
    });
    firstTime = false;
}
    
    // remise à 0 de la recherche lors de la navigation
    $(".nd2-search-button").remove();
    $(".nd2-search-input").remove();
    $(".nd2-search-back-button").remove();
    createSearch();
});



