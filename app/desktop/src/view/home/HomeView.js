Ext.define('DTAccountingWebApp.view.Main', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.tab.Panel',
		'Ext.layout.container.Border',
		//'DTAccountingWebApp.view.menu.Logout',
		'DTAccountingWebApp.view.menu.TreeMenu'
	],
	actionText: '',
	xtype: 'app-main',
	layout: {
		type: 'border'
	},
	items: [{
		region: 'west',
		xtype: 'treeMenu',
		id: 'treeMenu',
		width: 250,
		split: true,
		collapsible: true
	},
	{
		region: 'south',
		xtype: 'fieldset',
		id: 'fieldset',
		width: 250,
		items: [{
			text: 'theTime',
			id: 'theTime',
			xtype: 'button',
			icon: 'build/production/DTAccountingWebApp/Interface/resources/images/icons/fam/time.png'

		}, {
			text: 'Çıkış Yap',
			xtype: 'button',
			icon: 'build/production/DTAccountingWebApp/resources/images/icons/fam/cancel.png',
			listeners: {
				click: function () {
					Ext.MessageBox.show({
						title: 'Uyarı',
						msg: 'Çıkmak istediğinize emin misiniz?',
						icon: Ext.Msg.OK,
						buttons: Ext.Msg.YESNO,
						fn: function (response) {
							if (response === 'yes') {
								location.replace(DTAccountingWebApp.Constants.MAIN_DIR + '/Logout.aspx');
							}
						}
					});
				}
			}
		}]
	}, {
		region: 'center',
		xtype: 'tabpanel',
		itemId: 'contentTabs',
		items: [{
			id: 'welcomeTab',
			title: Ext.util.Cookies.get("hostDNS")
		}]
	}]
});


var sec = 20;   // set the seconds
var min = 120; // set the minutes

Ext.EventManager.on(document, 'mousedown', function (e, t) {
	min = 120;
	sec = 30;
});

function countDown() {
	
	
	////////////////////////
var time="";

	
	const worker =new Worker("/worker.js");

	worker.postMessage('start');

	worker.addEventListener('message', function(e){
		console.log(e.data);
		sec=e.data[0];
		min=e.data[1];
		time = (min <= 9 ? "0" + min : min) + ":" + sec + " sn";
		console.log(time);
		if (document.getElementById) { theTime.innerHTML = time; }
	});

	/////////////////////////

	if (min == '00' && sec == '00') {

		worker.postMessage('stop');//////////////////////////
		/*sec = "00"; window.clearTimeout(SD);*/
		location.replace(DTAccountingWebApp.Constants.MAIN_DIR + '/Logout.aspx');
	}
	if (min == '0' && sec == '10') {
		Ext.MessageBox.show({
			title: 'Uyarı',
			msg: 'Timeout olmanıza son 5 dk kaldı! Süreyi uzatmak ister misiniz ?',
			icon: Ext.Msg.OK,
			buttons: Ext.Msg.YESNO,
			fn: function (response) {
				if (response === 'yes') {
					worker.postMessage('extend');//////////////////////////
					/*min = 00;
					sec = 30;*/
				}
				else if (response === 'no') {
					location.replace(DTAccountingWebApp.Constants.MAIN_DIR + '/Logout.aspx');
				}
			}
		});
	}
	if (!Ext.util.Cookies.get("dt.accounting.token")) {
		Ext.MessageBox.show({
			title: 'Uyarı',
			msg: 'Oturumuzun Kapandı Lütfen Tekrar giriş yapınız..',
			icon: Ext.Msg.OK,
			buttons: Ext.Msg.OK,
			fn: function (response) {
				location.replace(DTAccountingWebApp.Constants.LOGIN_PAGE);
			}
		});

		return;
	}
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(function () {
	countDown();
});