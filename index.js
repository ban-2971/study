$(function(){
	// フォントサイズ
	for(var i = 16; i <= 50; i++){
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerHTML = "フォントサイズ：" + i + "px";
		$("#fontSize").append(option);
	};
	$("#fontSize").change(function(){
		var size = $(this).val();
		$("textarea").css("fontSize", size + "px");
	});


	//現在時刻
	setInterval(function(){
		var now   = new Date();
		var year  = now.getFullYear();
		var month = now.getMonth() + 1;
		var date  = now.getDate();
		var weeks = now.getDay();
		var week  = ["日", "月", "火", "水", "木", "金", "土"][weeks];
		var hour  = now.getHours().toString().padStart(2, '0');
		var min   = now.getMinutes().toString().padStart(2, '0');
		var sec   = now.getSeconds().toString().padStart(2, '0');

		$("#currentTime").html(year + "年" + month + "月" + date + "日" + "(" + week + ")" + hour + ":" + min + ":" + sec);
	}, 1000);


	//クリア
	$("#clearTextarea").click(function(){
		if(!confirm("本当に消していいですか？")){
			return false;
		}else{
			$("#textarea1").val("");
		}
	});


	//コピー
	$("#copyTextarea").click(function(){
		$("#textarea1").select();
		document.execCommand('copy');
	});


	//保存
	$("#saveTextarea").click(function(){
		if(!confirm("保存しますか？")){
			return false;
		}else{
			const txt = $("#textarea1").val();
			if (!txt){
				return;
			}
			const blob = new Blob([txt], {type: 'text/plain'});
			const a = document.createElement('a');
			a.href =  URL.createObjectURL(blob);
			a.download = 'memo.txt';
			a.click();
		}
	});


	//読み込み
	$("#file").change(function(){
		let fileReader = new FileReader();
		let file = $(this).prop("files")[0];
		fileReader.readAsText(file);
		fileReader.onload = function(){
			$("#textarea1").val(fileReader.result);
		}
	});


	//ストップウォッチ
	var intervalId = null;
	//経過時間のミリ秒
	var elapsed = 0;

	function updateTime(){
		const ms = elapsed % 1000;
		const s = Math.floor(elapsed / 1000) % 60;
		const m = Math.floor(elapsed / (1000*60)) % 60;
		const h = Math.floor(elapsed / (1000*60*60));

		const msStr = ms.toString().padStart(3, '0');
		const sStr = s.toString().padStart(2, '0');
		const mStr = m.toString().padStart(2, '0');
		const hStr = h.toString().padStart(2, '0');

		$("#time").html(hStr + ":" + mStr + ":" + sStr);
	}

	$("#start").click(function(){
		if(intervalId !== null){ return; }
		var pre = new Date();
		$("#start").prop("disabled", true);
		$("#stop").prop("disabled", false);
		$("#reset").prop("disabled", true);
		intervalId = setInterval(function(){
			const now = new Date();
			elapsed += now - pre;
			pre = now;
			updateTime();
		}, 10);
	});

	$("#stop").click(function(){
		clearInterval(intervalId);
		$("#start").prop("disabled", false);
		$("#stop").prop("disabled", true);
		$("#reset").prop("disabled", false);
		intervalId = null;
	});

	$("#reset").click(function(){
		elapsed = 0;
		$("#start").prop("disabled", false);
		$("#stop").prop("disabled", true);
		$("#reset").prop("disabled", true);
		updateTime();
	});


	//ページが閉じられる時
	$(window).on('beforeunload', function(){
		return "";
	});
});




