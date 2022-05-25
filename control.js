//ターン表示の変数
let turn = document.querySelector("h2");

let judgdisplay = document.querySelector("display-result");

//IDからオブジェクトを取得
function bringid(fieldid) {
    return document.getElementById(fieldid);
}

let fieldButtomsID = [
    ['actions1', 'actions2', 'actions3'],
    ['actions4', 'actions5', 'actions6'],
    ['actions7', 'actions8', 'actions9'],
]






//先行・後攻のマーク
const firstPlay = '〇';
const secondPlay = '✕';



//ターン数
let count = 1;

//先行か後攻かを判断する
function turnAction() {
    let changeAction = count % 2;
    return changeAction == 1;
}

//どちらのターンかを判別する
function changeDisplayCount() {
    if (turnAction()) {
        // 後攻のターンを表示する
        turn.textContent = "後攻の番です"
    } else {
        // 先攻のターンを表示する
        turn.textContent = "先攻の番です"
    }
}

//プレイが終了しているかを判断する
function judgment() {

      //横方向での揃え確認
    let gameSet = false
    for (let row = 0; row < 3; row++) {
        let gameSet = WinFlag(fieldButtomsID[row][0], fieldButtomsID[row][1], fieldButtomsID[row][2])
        if (gameSet) {
            winnermessage(bringid(fieldButtomsID[row][0]).value  + "の勝ち");
            return true;
        }
    }

    //縦方向での揃え確認
    for (let col = 0; col < 3; col++) {
        let gameSet = WinFlag(fieldButtomsID[0][col], fieldButtomsID[1][col], fieldButtomsID[2][col])
        if (gameSet) {
            winnermessage(bringid(fieldButtomsID[0][col]).value + "の勝ち");
            return true;
        }
    }

    /*斜め方向での揃え確認
        左上、真ん中、右下*/
        gameSet = WinFlag(fieldButtomsID[0][0], fieldButtomsID[1][1], fieldButtomsID[2][2]);
        if (gameSet) {
            winnermessage(bringid(fieldButtomsID[0][0]).value + "の勝ち");
            return true;
        }

        // 右上、真ん中、左下
        gameSet = WinFlag(fieldButtomsID[2][0], fieldButtomsID[1][1], fieldButtomsID[2][0]);
        if (gameSet) {
            winnermessage(bringid(fieldButtomsID[0][0]).value + "の勝ち");
            return true;
        }
        //ゲーム続行の場合
        return false;
}


 //三マスマークが配置されているか
 function WinFlag(one, two, three) {
    if (bringid(one).value == '') {
        return false;
    }

    if (bringid(two).value == '') {
        return false;
    }

    if (bringid(three).value == '') {
        return false;
    }

    //マークがそろっているか
    if (
        (bringid(one).value == bringid(two).value)
        && (bringid(two).value == bringid(three).value)
    ) {
        return true;
    }
    return false;
}


function winnermessage(message) {
    bringid('display-result').innerHTML = message;
}

//クリックされた際の処理
function clickAction(event) {
    let fieldid = event.target.id;
    let bringObject = bringid(fieldid);

    //クリックしたマスが空いているかを判別
    if (bringObject.value != "") {
        return;
    }

    //マス目にマークを設定する
    if (turnAction()) {
        bringObject.value = firstPlay;
    } else {
        bringObject.value = secondPlay;
    }


    if (judgment()) {

        return;
    }

    //ターン数を増やす
    count += 1

    changeDisplayCount();

}

//もう一度Playボタンクリック時のリセット機能
var reload = document.getElementById("reset") ;
reload.addEventListener("click" , function() {
    window.location.reload()
});


//クリックを反応させる
function loadclick() {
    actions1.onclick = clickAction;
    actions2.onclick = clickAction;
    actions3.onclick = clickAction;
    actions4.onclick = clickAction;
    actions5.onclick = clickAction;
    actions6.onclick = clickAction;
    actions7.onclick = clickAction;
    actions8.onclick = clickAction;
    actions9.onclick = clickAction;
}



window.onload = loadclick;
