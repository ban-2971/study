
	//現在時刻
	function currentTime(){
		var now   = new Date();

		var year   = now.getFullYear();
		var month  = now.getMonth() + 1;
		var date   = now.getDate();
		var week   = now.getDay();
		var jaWeek = ["日", "月", "火", "水", "木", "金", "土"][week];
		var hour   = ("0" + now.getHours()).slice(-2);
		var min    = ("0" + now.getMinutes()).slice(-2);
		var sec    = ("0" + now.getSeconds()).slice(-2);

		document.getElementById("currentTime").innerHTML = year + "年" + month + "月" + date + "日" + "(" + jaWeek + ")" + hour + ":" + min + ":" + sec;
		//target.innerHTML = now.toLocaleString("ja");
	}
	setInterval('currentTime()', 1000);

	//クリア
	function clearTextarea() {
		if(window.confirm('本当に消していいですか？')){
			document.getElementById("textarea1").value = '';
		}
	}

	//コピー
	function copyTextarea(){
		document.getElementById("textarea1").select();
		document.execCommand('copy');
	}

	//保存
	function saveTextarea(){
		if(window.confirm('保存しますか？')){
			const txt = document.getElementById('textarea1').value;
			if (!txt){
				return;
			}
			const blob = new Blob([txt], { type: 'text/plain' });
			const a = document.createElement('a');
			a.href =  URL.createObjectURL(blob);
			a.download = 'memo.txt';
			a.click();
		}
	}

	//読み込み
	function readTextarea(){
		let fileReader = new FileReader();
		let file = document.getElementById('file').files[0];
		fileReader.readAsText(file);
		fileReader.onload = function() {
			document.getElementById("textarea1").value = fileReader.result;
		}
	}

	$(function(){
		// フォントサイズ
		$('#fontSize').change(function() {
			var size = $(this).val();
			$("textarea").css("fontSize", size+"px");
		});


		//ストップウォッチ
		const timeElement = document.getElementById('time');
		const start = document.getElementById('start');
		const stop = document.getElementById('stop');
		const reset = document.getElementById('reset');

		//経過時間のミリ秒
		let elapsed = 0;

		let intervalId = null;

		function updateTime(){
			const ms = elapsed % 1000;
			const s = Math.floor(elapsed / 1000) % 60;
			const m = Math.floor(elapsed / (1000*60)) % 60;
			const h = Math.floor(elapsed / (1000*60*60));

			const msStr = ms.toString().padStart(3, '0');
			const sStr = s.toString().padStart(2, '0');
			const mStr = m.toString().padStart(2, '0');
			const hStr = h.toString().padStart(2, '0');

			timeElement.innerHTML = `${hStr}:${mStr}:${sStr}`;

		}

		start.addEventListener('click', function(e){
			if(intervalId !== null){ return; }
			let pre = new Date();
			start.setAttribute("disabled", true);
			stop.removeAttribute("disabled");
			reset.setAttribute("disabled", true);
			intervalId = setInterval(function(){
				const now = new Date();
				elapsed += now - pre;
				pre = now;
				updateTime();
			}, 10);
		});

		stop.addEventListener('click', function(e){
			clearInterval(intervalId);
			start.removeAttribute("disabled");
			stop.setAttribute("disabled", true);
			reset.removeAttribute("disabled");
			intervalId = null;
		});

		reset.addEventListener('click', function(e){
			elapsed = 0;
			start.removeAttribute("disabled");
			stop.setAttribute("disabled", true);
			reset.setAttribute("disabled", true);
			updateTime();
		});
	});


	//ラウザを閉じる前の確認アラート
	window.addEventListener('beforeunload', function (e) {
		e.preventDefault();
		e.returnValue = '';
	});

