(function($){var PROP_NAME='icalendar';var FLASH_ID='icalendar-flash-copy';function iCalendar(){this._defaults={sites:[],icons:'/images/icalendar.png',iconSize:16,target:'_blank',compact:false,popup:false,popupText:'Send to my calendar...',tipPrefix:'',echoUrl:'',echoField:'',start:null,end:null,title:'',summary:'',description:'',location:'',url:'',contact:'',recurrence:null,copyConfirm:'The event will be copied to your clipboard. Continue?',copySucceeded:'The event has been copied to your clipboard',copyFailed:'Failed to copy the event to the clipboard\n',copyFlash:'clipboard.swf',copyUnavailable:'The clipboard is unavailable, please copy the event details from below:\n'};this._sites={'google':{display:'Google',icon:0,override:null,url:'http://www.google.com/calendar/event?action=TEMPLATE'+'&amp;text={t}&amp;dates={s}/{e}&amp;details={d}&amp;location={l}&amp;sprop=website:{u}'},'icalendar':{display:'iCalendar',icon:1,override:null,url:'echo'},'outlook':{display:'Outlook',icon:2,override:null,url:'echo'},'yahoo':{display:'Yahoo',icon:3,override:yahooOverride,url:'http://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20'+'&amp;title={t}&amp;st={s}&amp;dur={p}&amp;desc={d}&amp;in_loc={l}&amp;url={u}&amp;rpat={r}'}};}
var FREQ_SETTINGS=[{method:'Seconds',factor:1},{method:'Minutes',factor:60},{method:'Hours',factor:3600},{method:'Date',factor:86400},{method:'Month',factor:1},{method:'FullYear',factor:12},{method:'Date',factor:604800}];var SE=0;var MI=1;var HR=2;var DY=3;var MO=4;var YR=5;var WK=6;$.extend(iCalendar.prototype,{markerClassName:'hasICalendar',setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this;},addSite:function(id,display,icon,url,override){this._sites[id]={display:display,icon:icon,override:override,url:url};return this;},getSites:function(){return this._sites;},_attachICalendar:function(target,settings){target=$(target);if(target.hasClass(this.markerClassName)){return;}
target.addClass(this.markerClassName);this._updateICalendar(target,settings);},_changeICalendar:function(target,settings){target=$(target);if(!target.hasClass(this.markerClassName)){return;}
this._updateICalendar(target,settings);},_updateICalendar:function(target,settings){settings=extendRemove($.extend({},this._defaults,$.data(target[0],PROP_NAME)||{}),settings);$.data(target[0],PROP_NAME,settings);var sites=settings.sites||this._defaults.sites;if(sites.length==0){$.each(this._sites,function(id){sites[sites.length]=id;});}
var addSite=function(site,calId){var inserts={t:encodeURIComponent(settings.title),d:encodeURIComponent(settings.description),s:$.icalendar.formatDateTime(settings.start),e:$.icalendar.formatDateTime(settings.end),p:$.icalendar.calculateDuration(settings.start,settings.end),l:encodeURIComponent(settings.location),u:encodeURIComponent(settings.url),c:encodeURIComponent(settings.contact),r:makeRecurrence(settings.recurrence)};if(site.override){site.override.apply(target,[inserts,settings]);}
var url=site.url;$.each(inserts,function(n,v){var re=new RegExp('\\{'+n+'\\}','g');url=url.replace(re,v);});var url=(site.url=='echo'?'#':url);var item=$('<li></li>');var anchor=$('<a href="'+url+'" title="'+settings.tipPrefix+site.display+'"'+(site.url=='echo'?'':' target="'+settings._target+'"')+'></a>');if(site.url=='echo'){anchor.click(function(){return $.icalendar._echo(target[0],calId);});}
var html='';if(site.icon!=null){if(typeof site.icon=='number'){html+='<span style="background: '+'transparent url('+settings.icons+') no-repeat -'+(site.icon*settings.iconSize)+'px 0px;'+($.browser.mozilla&&$.browser.version<'1.9'?' padding-left: '+settings.iconSize+'px; padding-bottom: '+Math.max(0,(settings.iconSize/2)-5)+'px;':'')+'"></span>';}
else{html+='<img src="'+site.icon+'"'+(($.browser.mozilla&&$.browser.version<'1.9')||($.browser.msie&&$.browser.version<'7.0')?' style="vertical-align: bottom;"':($.browser.msie?' style="vertical-align: middle;"':($.browser.opera||$.browser.safari?' style="vertical-align: baseline;"':'')))+'/>';}
html+=(settings.compact?'':'&#xa0;');}
anchor.html(html+(settings.compact?'':site.display));item.append(anchor);return item;};var list=$('<ul class="icalendar_list'+(settings.compact?' icalendar_compact':'')+'"></ul>');var allSites=this._sites;$.each(sites,function(index,id){list.append(addSite(allSites[id],id));});target.empty().append(list);if(settings.popup){list.before('<span class="icalendar_popup_text">'+settings.popupText+'</span>').wrap('<div class="icalendar_popup"></div>');target.click(function(){var target=$(this);var offset=target.offset();$('.icalendar_popup',target).css('left',offset.left).css('top',offset.top+target.outerHeight()).toggle();});}},_destroyICalendar:function(target){target=$(target);if(!target.hasClass(this.markerClassName)){return;}
target.removeClass(this.markerClassName).empty();$.removeData(target[0],PROP_NAME);},_echo:function(target,calId){var settings=$.data(target,PROP_NAME);var event=makeICalendar(settings);if(settings.echoUrl){window.location.href=settings.echoUrl+'?content='+escape(event);}
else if(settings.echoField){$(settings.echoField).val(event);}
else if(!settings.copyFlash){alert(settings.copyUnavailable+event);}
else if(confirm(settings.copyConfirm)){var error='';if(error=copyViaFlash(event,settings.copyFlash)){alert(settings.copyFailed+error);}
else{alert(settings.copySucceeded);}}
return false;},_ensureTwo:function(value){return(value<10?'0':'')+value;},formatDate:function(date,local){return(!date?'':''+date.getFullYear()+this._ensureTwo(date.getMonth()+1)+this._ensureTwo(date.getDate()));},formatDateTime:function(dateTime,local){return(!dateTime?'':(local?''+dateTime.getFullYear()+this._ensureTwo(dateTime.getMonth()+1)+this._ensureTwo(dateTime.getDate())+'T'+this._ensureTwo(dateTime.getHours())+this._ensureTwo(dateTime.getMinutes())+this._ensureTwo(dateTime.getSeconds()):''+dateTime.getUTCFullYear()+this._ensureTwo(dateTime.getUTCMonth()+1)+this._ensureTwo(dateTime.getUTCDate())+'T'+this._ensureTwo(dateTime.getUTCHours())+this._ensureTwo(dateTime.getUTCMinutes())+this._ensureTwo(dateTime.getUTCSeconds())+'Z'));},calculateDuration:function(start,end){if(!start||!end){return'';}
var seconds=Math.abs(end.getTime()-start.getTime())/1000;var days=Math.floor(seconds/86400);seconds-=days*86400;var hours=Math.floor(seconds/3600);seconds-=hours*3600;var minutes=Math.floor(seconds/60);seconds-=minutes*60;return(start.getTime()>end.getTime()?'-':'')+'P'+(days>0?days+'D':'')+(hours||minutes||seconds?'T'+hours+'H':'')+(minutes||seconds?minutes+'M':'')+(seconds?seconds+'S':'');},addDuration:function(start,duration){if(!duration){return start;}
var end=new Date(start.getTime());var matches=DURATION.exec(duration);if(!matches){throw'Invalid duration';}
if(matches[2]&&(matches[3]||matches[5]||matches[6]||matches[7])){throw'Invalid duration - week must be on its own';}
if(!matches[4]&&(matches[5]||matches[6]||matches[7])){throw'Invalid duration - missing time marker';}
var sign=(matches[1]=='-'?-1:+1);var apply=function(value,factor,method){value=parseInt(value);if(!isNaN(value)){end['setUTC'+method](end['getUTC'+method]()+sign*value*factor);}};if(matches[2]){apply(matches[2],7,'Date');}
else{apply(matches[3],1,'Date');apply(matches[5],1,'Hours');apply(matches[6],1,'Minutes');apply(matches[7],1,'Seconds');}
return end;},parse:function(content){var cal={};var timezones={};var lines=unfoldLines(content);parseGroup(lines,0,cal,timezones);if(!cal.vcalendar){throw'Invalid iCalendar data';}
return cal.vcalendar;},getWeekOfYear:function(date,weekStart){return getWeekOfYear(date,weekStart);},_parseParams:function(owner,params){return parseParams(owner,params);}});function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null){target[name]=null;}}
return target;}
$.fn.icalendar=function(options){var otherArgs=Array.prototype.slice.call(arguments,1);return this.each(function(){if(typeof options=='string'){$.icalendar['_'+options+'ICalendar'].apply($.icalendar,[this].concat(otherArgs));}
else{$.icalendar._attachICalendar(this,options||{});}});};$.icalendar=new iCalendar();function yahooOverride(inserts,settings){var twoDigits=function(value){return(value<10?'0':'')+value;};var dur=(settings.end?(settings.end.getTime()-settings.start.getTime())/60000:0);inserts.p=(dur?twoDigits(Math.floor(dur/60))+''+twoDigits(dur%60):'');if(inserts.r){var byDay=(settings.recurrence.by&&settings.recurrence.by[0].type=='day'?settings.recurrence.by[0].values.join('').toLowerCase():'');var freq={daily:'dy',weekly:'wk',monthly:'mh',yearly:'yr'}[settings.recurrence.freq];inserts.r=(byDay||freq?twoDigits(settings.recurrence.interval||1)+(byDay||freq):'');}}
function makeICalendar(event){var limit75=function(text){var out='';while(text.length>75){out+=text.substr(0,75)+'\n';text=' '+text.substr(75);}
out+=text;return out;};return'BEGIN:VCALENDAR\n'+'VERSION:2.0\n'+'PRODID:jquery.icalendar\n'+'METHOD:PUBLISH\n'+'BEGIN:VEVENT\n'+'UID:'+new Date().getTime()+'@'+(window.location.href.replace(/^[^\/]*\/\/([^\/]*)\/.*$/,'$1')||'localhost')+'\n'+'DTSTAMP:'+$.icalendar.formatDateTime(new Date())+'\n'+(event.url?limit75('URL:'+event.url)+'\n':'')+(event.contact?limit75('MAILTO:'+event.contact)+'\n':'')+limit75('TITLE:'+event.title)+'\n'+'DTSTART:'+$.icalendar.formatDateTime(event.start)+'\n'+'DTEND:'+$.icalendar.formatDateTime(event.end)+'\n'+(event.summary?limit75('SUMMARY:'+event.summary)+'\n':'')+(event.description?limit75('DESCRIPTION:'+event.description)+'\n':'')+(event.location?limit75('LOCATION:'+event.location)+'\n':'')+(event.recurrence?makeRecurrence(event.recurrence)+'\n':'')+'END:VEVENT\n'+'END:VCALENDAR';}
function makeRecurrence(recur){if(!recur){return'';}
var def='';if(recur.dates){def='RDATE;VALUE=DATE:';if(!isArray(recur.dates)){recur.dates=[recur.dates];}
for(var i=0;i<recur.dates.length;i++){def+=(i>0?',':'')+$.icalendar.formatDate(recur.dates[i]);}}
else if(recur.times){def='RDATE;VALUE=DATE-TIME:';if(!isArray(recur.times)){recur.times=[recur.times];}
for(var i=0;i<recur.times.length;i++){def+=(i>0?',':'')+$.icalendar.formatDateTime(recur.times[i]);}}
else if(recur.periods){def='RDATE;VALUE=PERIOD:';if(!isArray(recur.periods[0])){recur.periods=[recur.periods];}
for(var i=0;i<recur.periods.length;i++){def+=(i>0?',':'')+$.icalendar.formatDateTime(recur.periods[i][0])+'/'+(recur.periods[i][1].constructor!=Date?recur.periods[i][1]:$.icalendar.formatDateTime(recur.periods[i][1]));}}
else{def='RRULE:FREQ='+(recur.freq||'daily').toUpperCase()+(recur.interval?';INTERVAL='+recur.interval:'')+(recur.until?';UNTIL='+$.icalendar.formatDateTime(recur.until):(recur.count?';COUNT='+recur.count:''))+(recur.weekStart!=null?';WKST='+['SU','MO','TU','WE','TH','FR','SA'][recur.weekStart]:'');if(recur.by){if(!isArray(recur.by)){recur.by=[recur.by];}
for(var i=0;i<recur.by.length;i++){if(!isArray(recur.by[i].values)){recur.by[i].values=[recur.by[i].values];}
def+=';BY'+recur.by[i].type.toUpperCase()+'='+recur.by[i].values.join(',');}}}
return def;}
function copyViaFlash(text,url){$('#'+FLASH_ID).remove();try{$('body').append('<div id="'+FLASH_ID+'"><embed src="'+url+'" FlashVars="clipboard='+encodeURIComponent(text)+'" width="0" height="0" type="application/x-shockwave-flash"></embed></div>');return'';}
catch(e){return e;}}
var FOLDED=/^\s(.*)$/;var ENTRY=/^([A-Za-z0-9-]+)((?:;[A-Za-z0-9-]+=(?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)*):(.*)$/;var PARAM=/;([A-Za-z0-9-]+)=((?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)/g;var PARAM_VALUE=/,?("[^"]+"|[^";:,]+)/g;var DATEONLY=/^(\d{4})(\d\d)(\d\d)$/;var DATETIME=/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;var DATETIME_RANGE=/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)\/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;var TZ_OFFSET=/^([+-])(\d\d)(\d\d)$/;var DURATION=/^([+-])?P(\d+W)?(\d+D)?(T)?(\d+H)?(\d+M)?(\d+S)?$/;var RESERVED_NAMES=['class'];function unfoldLines(content){var lines=content.replace(/\r\n/g,'\n').split('\n');for(var i=lines.length-1;i>0;i--){var matches=FOLDED.exec(lines[i]);if(matches){lines[i-1]+=matches[1];lines[i]='';}}
return $.map(lines,function(line,i){return(line?line:null);});}
function parseGroup(lines,index,owner,timezones){if(index>=lines.length||lines[index].indexOf('BEGIN:')!=0){throw'Missing group start';}
var group={};var name=lines[index].substr(6);addEntry(owner,name.toLowerCase(),group);index++;while(index<lines.length&&lines[index].indexOf('END:')!=0){if(lines[index].indexOf('BEGIN:')==0){index=parseGroup(lines,index,group,timezones);}
else{var entry=parseEntry(lines[index]);addEntry(group,entry._name,(entry._simple?entry._value:entry));}
index++;}
if(name=='VTIMEZONE'){var matches=TZ_OFFSET.exec(group.standard.tzoffsetto);if(matches){timezones[group.tzid]=(matches[1]=='-'?-1:+1)*(parseInt(matches[2],10)*60+parseInt(matches[3],10));}}
else{for(var name2 in group){resolveTimezones(group[name2],timezones);}}
if(lines[index]!='END:'+name){throw'Missing group end '+name;}
return index;}
function resolveTimezones(value,timezones){if(!value){return;}
if(value.tzid&&value._value){var offset=timezones[value.tzid];var offsetDate=function(date,tzid){date.setMinutes(date.getMinutes()-offset);date._type=tzid;};if(isArray(value._value)){for(var i=0;i<value._value.length;i++){offsetDate(value._value[i],value.tzid);}}
else if(value._value.start&&value._value.end){offsetDate(value._value.start,value.tzid);offsetDate(value._value.end,value.tzid);}
else{offsetDate(value._value,value.tzid);}}
else if(isArray(value)){for(var i=0;i<value.length;i++){resolveTimezones(value[i],timezones);}}}
function addEntry(owner,name,value){if(typeof value=='string'){value=value.replace(/\\n/g,'\n');}
if($.inArray(name,RESERVED_NAMES)>-1){name+='_';}
if(owner[name]){if(!isArray(owner[name])||owner['_'+name+'IsArray']){owner[name]=[owner[name]];}
owner[name][owner[name].length]=value;if(owner['_'+name+'IsArray']){owner['_'+name+'IsArray']=undefined;}}
else{owner[name]=value;if(isArray(value)){owner['_'+name+'IsArray']=true;}}}
function parseEntry(line){var entry={};var matches=ENTRY.exec(line);if(!matches){throw'Missing entry name: '+line;}
entry._name=matches[1].toLowerCase();entry._value=checkDate(matches[3]);entry._simple=true;parseParams(entry,matches[2]);return entry;}
function parseParams(owner,params){var param=PARAM.exec(params);while(param){var values=[];var value=PARAM_VALUE.exec(param[2]);while(value){values.push(checkDate(value[1].replace(/^"(.*)"$/,'$1')));value=PARAM_VALUE.exec(param[2]);}
owner[param[1].toLowerCase()]=(values.length>1?values:values[0]);owner._simple=false;param=PARAM.exec(params);}}
function checkDate(value){var matches=DATETIME.exec(value);if(matches){return makeDate(matches);}
matches=DATETIME_RANGE.exec(value);if(matches){return{start:makeDate(matches),end:makeDate(matches.slice(7))};}
matches=DATEONLY.exec(value);if(matches){return makeDate(matches.concat([0,0,0,'']));}
return value;}
function makeDate(matches){var date=new Date(matches[1],matches[2]-1,matches[3],matches[4],matches[5],matches[6]);date._type=(matches[7]?'UTC':'float');return utcDate(date);}
function utcDate(date){date.setMinutes(date.getMinutes()-date.getTimezoneOffset());return date;}
function getWeekOfYear(date,weekStart){weekStart=(weekStart||weekStart==0?weekStart:1);var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate(),(date.getTimezoneOffset()/-60));var firstDay=new Date(checkDate.getFullYear(),1-1,4);var firstDOW=firstDay.getDay();firstDay.setDate(4+weekStart-firstDOW-(weekStart>firstDOW?7:0));if(checkDate<firstDay){checkDate.setDate(checkDate.getDate()-3);return getWeekOfYear(checkDate,weekStart);}else if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){var firstDay2=new Date(checkDate.getFullYear()+1,1-1,4);firstDOW=firstDay2.getDay();firstDay2.setDate(4+weekStart-firstDOW-(weekStart>firstDOW?7:0));if(checkDate>=firstDay2){return 1;}}
return Math.floor(((checkDate-firstDay)/(FREQ_SETTINGS[DY].factor*1000))/7)+1;}
function isArray(a){return(a&&a.constructor==Array);}})(jQuery);