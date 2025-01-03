
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Link from 'next/link'
{/*
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import Data from "../interface/data"

import { useLocation } from "react-router-dom";
import propsOfTodos from "../interface/propsOfTodos";
import { DateTime } from "luxon";
*/}
export default function exam() {
    {/*
    const location = useLocation();
    const propsOfTodos = location.state as propsOfTodos;
    const todos = propsOfTodos.todos;
    const setTodos = propsOfTodos.setTodos;
    const now = DateTime.local();

    const changetodos = (index: number, data: Data) => {
        const temp: Data[] = [...todos];
        setTodos(temp.toSpliced(index, 1, data));
    }
    */}
    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center min-h-screen">
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle>テスト</CardTitle>
                    </CardHeader>
                    <CardContent>
 {/*
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
*/}
                        <Link href="/">戻る</Link>
                    </CardContent>


                </Card >
            </div>
        </>);
}