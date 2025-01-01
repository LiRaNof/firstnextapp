"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { MdDelete } from "react-icons/md";
import { DateTime } from "luxon";
import { Ri24HoursFill } from "react-icons/ri";

import { v4 as uuid } from "uuid";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

import Data from "../../components/interface/data"
import Link from 'next/link'

export default function Home() {
    const now = DateTime.local();

    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<Data[]>([]);


    const changetodos = (index: number, data: Data) => {
        const temp: Data[] = [...todos];
        setTodos(temp.toSpliced(index, 1, data));
    }

    return (

        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>TODO App</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {todos.map((data, index) => {
                            if (data.due < now) return (
                                <li key={uuid()} className="bg-white p-2 mt-2 flex">
                                    <input onBlur={(e) => {
                                        const newdata: Data = { todo: e.target.value, due: data.due, rank: data.rank }
                                        changetodos(index, newdata)
                                    }}
                                        defaultValue={data.todo}
                                    ></input>
                                    <label className="duelabel">{data.due.toLocaleString()}</label>
                                    <label className="rank">rank:{data.rank}</label>

                                    <button
                                        className="ml-2"
                                        onClick={() => {
                                            setTodos(todos.filter((_, i) => i !== index));
                                        }}
                                    >
                                        <MdDelete color="red" />
                                    </button>
                                    <button
                                        className="ml-3"
                                        onClick={() => {
                                            let newrank = data.rank;
                                            if (newrank < 6) {
                                                newrank = newrank + 1;
                                            }
                                            changetodos(
                                                index,
                                                {
                                                    todo: data.todo,
                                                    due: now.plus({ day: newrank * 2 }),
                                                    rank: newrank
                                                })

                                        }}
                                    >
                                        <FaRegThumbsUp color="black" />
                                    </button>
                                    <button
                                        className="ml-3"
                                        onClick={() => {
                                            let newrank = data.rank;
                                            if (newrank > 0) {
                                                newrank = newrank - 1;
                                            }

                                            changetodos(index, { todo: data.todo, due: now.plus({ day: newrank * 2 }), rank: newrank })

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
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {/* <div>{todo}</div> */}
                    <Button
                        className="w-full mt-2"
                        onClick={() => {
                            if (!(input == "")) {
                                const newdata: Data = { todo: input, due: now, rank: 0 };
                                setTodos([...todos, newdata]);
                                setInput("")
                            }
                        }}
                    >
                        追加
                    </Button>
                    <ul>
                        {todos.map((data, index) => (
                            <li key={uuid()} className="bg-white p-2 mt-2 flex">
                                <input onBlur={(e) => {
                                    const newdata: Data = { todo: e.target.value, due: data.due, rank: data.rank }
                                    changetodos(index, newdata)
                                }}
                                    defaultValue={data.todo}
                                ></input>
                                <label className="duelabel">{data.due.toLocaleString()}</label>
                                <label className="rank">rank:{data.rank}</label>

                                <button
                                    className="ml-2"
                                    onClick={() => {
                                        setTodos(todos.filter((_, i) => i !== index));
                                    }}
                                >
                                    <MdDelete color="red" />
                                </button>
                                <button
                                    className="ml-3"
                                    onClick={() => {

                                        changetodos(index, { todo: data.todo, due: data.due.plus({ day: 1 }), rank: data.rank })

                                    }}
                                >
                                    <Ri24HoursFill color="black" />
                                </button>
                                <button
                                    className="ml-3"
                                    onClick={() => {

                                        changetodos(index, { todo: data.todo, due: data.due.minus({ day: 1 }), rank: data.rank })

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
        </div>

    );

}