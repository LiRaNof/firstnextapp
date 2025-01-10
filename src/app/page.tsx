"use client"

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { MdDelete } from "react-icons/md";
import { DateTime } from "luxon";
import { Ri24HoursFill } from "react-icons/ri";


import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";


import Link from 'next/link'
import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'

export default  function Home() {
  
  const now = DateTime.local();
  const [inputValue, setInputValue] = useState<string>("")


  const [todos, setTodos] = useState<Todo[]>([]);


  const changetodos = (index: number, data: Todo) => {
    console.log("changetodo start")
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === data.id) {
          return data; // 更新対象を置き換える
        } else {
          return todo; // 変更しない場合はそのまま返す
        }
      })
    );
  };

  useEffect(() => {
    const getTodo = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`)
      const rawTodos: Todo[] = await response.json()
      const todos = rawTodos.map((todo) => ({
        ...todo,
        due: new Date(todo.due), // 変換処理を追加
      }));
      setTodos(todos)
    }
    getTodo()
  }, [])

  return (

    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>TODO App</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {todos.map((todo, index) => {
              const dt = DateTime.fromJSDate(todo.due);
              if (dt < now) return (
                <li key={todo.id} className="bg-white p-2 mt-2 flex">
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={async () => {
                      const updatedCompleted = !todo.completed; // completed を反転させる
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                        {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ completed: updatedCompleted }),
                        }
                      )
                      const rawupdateTodo = await response.json()
                      const updateTodo = { ...rawupdateTodo, due: new Date(rawupdateTodo.due), }
                      setTodos(
                        todos.map((todo) => {
                          if (todo.id === updateTodo.id) {
                            return updateTodo
                          } else {
                            return todo
                          }
                        })
                      )
                    }}
                    className='mr-2'
                  />
                  <input
                    value={todo.title}
                    onChange={(e) => {
                      setTodos((prevTodos) => prevTodos.map((t) =>
                        t.id === todo.id ? { ...t, title: e.target.value } : t
                      )
                      );
                    }}
                    onBlur={async (e) => {
                      const newdata: Todo = { id: todo.id, due: todo.due, title: e.target.value, rank: todo.rank, completed: todo.completed }
                      console.log("e.target.value=" + e.target.value);
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                        {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ title: e.target.value }),
                        }
                      )
                      const updatedTodo = await response.json();
                      changetodos(index, {
                        ...updatedTodo,
                        due: new Date(updatedTodo.due),
                      });

                    }}

                  ></input>
                  <label className="duelabel">{todo.due.toLocaleString()}</label>
                  <label className="rank">rank:{todo.rank}</label>

                  <button
                    className="ml-2"
                    onClick={async () => {

                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                        {
                          method: 'DELETE',
                        }
                      )

                      const deleteTodo = await response.json()
                      setTodos(todos.filter((todo) => todo.id !== deleteTodo.id))
                    }}
                  >
                    <MdDelete color="red" />
                  </button>
                  <button
                    className="ml-3"
                    onClick={async () => {
                      let newrank = todo.rank;
                      if (newrank < 6) {
                        newrank = newrank + 1;
                      }
                      const newdata: Todo = { id: todo.id, due: now.plus({ day: newrank * 2 }).toJSDate(), title: todo.title, rank: newrank, completed: todo.completed }
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                        {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ due: newdata.due, rank: newdata.rank }),
                        }
                      )
                      changetodos(
                        index,
                        newdata
                      )

                    }}
                  >
                    <FaRegThumbsUp color="black" />
                  </button>
                  <button
                    className="ml-3"
                    onClick={async () => {
                      let newrank = todo.rank;
                      if (newrank > 0) {
                        newrank = newrank - 1;
                      }
                      const newdata: Todo = { id: todo.id, due: now.plus({ day: newrank * 2 }).toJSDate(), title: todo.title, rank: newrank, completed: todo.completed }
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                        {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ due: newdata.due, rank: newdata.rank }),
                        }
                      )
                      changetodos(
                        index,
                        newdata
                      )

                    }}
                  >
                    <FaRegThumbsDown color="red" />
                  </button>
                </li>
              );
            })}

          </ul>

          <Input
            placeholder="タスクを追加"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* <div>{todo}</div> */}
          <Button
            className="w-full mt-2"
            onClick={
              async () => {

                if (!inputValue) alert('入力してください')
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/todo`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: inputValue }),
                  }
                )
                const rawnewTodo: Todo = await response.json()
                const newTodo = {
                  ...rawnewTodo,
                  due: new Date(rawnewTodo.due), // 変換処理を追加
                }
                setTodos([...todos, newTodo])
                setInputValue("")
              }
            }


          >
            追加
          </Button>
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id} className="bg-white p-2 mt-2 flex">
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={async () => {
                    const updatedCompleted = !todo.completed; // completed を反転させる
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                      {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ completed: updatedCompleted }),
                      }
                    )
                    const rawupdateTodo = await response.json()
                    const updateTodo = { ...rawupdateTodo, due: new Date(rawupdateTodo.due), }
                    setTodos(
                      todos.map((todo) => {
                        if (todo.id === updateTodo.id) {
                          return updateTodo
                        } else {
                          return todo
                        }
                      })
                    )
                  }}
                  className='mr-2'
                />
                <input
                  value={todo.title}
                  onChange={(e) => {
                    setTodos((prevTodos) => prevTodos.map((t) =>
                      t.id === todo.id ? { ...t, title: e.target.value } : t
                    )
                    );
                  }}
                  onBlur={async (e) => {
                    const newdata: Todo = { id: todo.id, due: todo.due, title: e.target.value, rank: todo.rank, completed: todo.completed }
                    console.log("e.target.value=" + e.target.value);
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                      {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ title: newdata.title }),
                      }
                    )
                    changetodos(index, newdata)
                  }}

                ></input>
                <label className="duelabel">{todo.due.toLocaleString()}</label>
                <label className="rank">rank:{todo.rank}</label>

                <button
                  className="ml-2"
                  onClick={async () => {

                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                      {
                        method: 'DELETE',
                      }
                    )

                    const deleteTodo = await response.json()
                    setTodos(todos.filter((todo) => todo.id !== deleteTodo.id))
                  }}
                >
                  <MdDelete color="red" />
                </button>
                <button
                  className="ml-3"
                  onClick={
                    async () => {
                      const dt = DateTime.fromJSDate(todo.due);
                      const newdata: Todo = { id: todo.id, due: dt.plus({ day: 1 }).toJSDate(), title: todo.title, rank: todo.rank, completed: todo.completed }
                      console.log("due=" + todo.due.toString());
                      console.log("dt=" + dt.toString());
                      console.log("newdue=" + newdata.due.toString());
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                        {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ title: newdata.title }),
                        }
                      )
                      changetodos(index, newdata)

                    }}
                >
                  <Ri24HoursFill color="black" />
                </button>
                <button
                  className="ml-3"
                  onClick={async () => {
                    const dt = DateTime.fromJSDate(todo.due);

                    const newdata: Todo = { id: todo.id, due: dt.minus({ day: 1 }).toJSDate(), title: todo.title, rank: todo.rank, completed: todo.completed }
                    console.log("due=" + todo.due.toString());
                    console.log("dt=" + dt.toString());
                    console.log("newdue=" + newdata.due.toString());
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                      {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ due: newdata.due }),
                      }
                    )
                    changetodos(index, newdata)

                  }}
                >
                  <Ri24HoursFill color="red" />
                </button>
              </li>
            ))}
          </ul>
          <div>
            <Link href="/exam">テスト</Link>
          </div>

        </CardContent>
      </Card>
    </div >

  );

}