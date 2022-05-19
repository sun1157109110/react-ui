import * as React from 'react'
import { atom, useRecoilState } from 'recoil'
import './App.scss'
export interface IAppProps {}

const counter = atom({
  key: 'myCounter',
  default: 0,
})


export default function App(props: IAppProps) {
  return (
    <div className='app'>
      <Counter></Counter>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useRecoilState(counter)
  const incrementByOne = () => setCount(count + 1)

  return (
    <div>
      Count: {count}
      <br />
      <button onClick={incrementByOne}>Increment</button>
    </div>
  )
}
