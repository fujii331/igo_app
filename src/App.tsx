import { useState } from "react";
import "./App.css";

function App() {
  // 初期値の値のリストを定義
  // : number[]とすることでnumber型のリストと型を明示できる
  const valueList: number[] = [];

  // listに全て0で詰める
  for (let i = 0; i < 25; i++) {
    // pushはリストに値を詰める
    valueList.push(0);
  }

  // console.log()で中身を確認できる
  // console.log(valueList)
  // console.log(valueList.length)

  // useStateで、値が動的に変化するものを定義
  const [valueListState, setValueList] = useState(valueList);

  // 表示するリストを定義
  const display = [];

  // 指定した範囲のランダムな数字を取得する処理を定義
  const randRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  // ライバルの行動を定義
  function rivalTurn(valueListAfterMyTurn: number[]) {
    let randomValue = randRange(0, 24);

    // 盤面が全部1だった時無限ループに入るので防止用にcountを定義
    let count = 0;
    while (valueListAfterMyTurn[randomValue] === 1 || count < 50) {
      // 盤面の値を更新
      randomValue = randRange(0, 24);
      // 無限ループ回避用数字を更新
      count++;
    }

    // mapはlistの中身を一個一個取り出して新たなlistを作る
    const updatedRivalValueList = valueListAfterMyTurn.map((value, key) => {
      if (key === randomValue) {
        return 2;
      } else {
        return valueListAfterMyTurn[key];
      }
    });

    // listを更新
    setValueList(updatedRivalValueList);
  }

  // ループを行なってテーブルの中身を追加していく
  for (let i = 1; i <= 5; i++) {
    display.push(
      <tr>
        {[0, 1, 2, 3, 4].map((rowNumber) => {
          const targetPosition: number = rowNumber + 5 * (i - 1);

          return (
            <td
              onClick={() => {
                if (valueListState[targetPosition] === 0) {
                  const updatedValueList = valueListState.map((value, key) => {
                    if (key === targetPosition) {
                      return 1;
                    } else {
                      return valueListState[key];
                    }
                  });
                  setValueList(updatedValueList);
                  rivalTurn(updatedValueList);
                }
              }}
            >
              {valueListState[targetPosition]}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <tbody>{display}</tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
