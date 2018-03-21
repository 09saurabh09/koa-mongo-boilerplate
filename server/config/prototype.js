/**
 * Created by saurabhk on 03/01/17.
 */
(function(){
    "use strict";
    String.prototype.toSentence = function(){
        var result = this.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    };

    String.prototype.snakeToSentance = function(){
        return this.replace(/_/g, " ").replace(/\s\s+/g, ' ');
    };

    String.prototype.toCamel = function(){
        return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
    };

    String.prototype.toDash = function(){
        return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    };

    String.prototype.toUnderscore = function(){
        return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
    };

    String.prototype.reverse = function(){
        return this.split("").reverse().join("");
    };

    String.prototype.titalize = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

})();