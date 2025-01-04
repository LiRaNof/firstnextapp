import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = Number(params.id)
    // リクエストのidを元に削除
    const response = await prisma.todo.delete({
      where: {
        id,
      },
    })
    return Response.json(response)
  }
  export async function PATCH(
    request: NextRequest,
    context: { params: { id: string } }
  ) {
    // params を非同期で解決
    const { id } = await context.params;  // awaitを使ってparamsを取得
  
    const todoId = Number(id); // 数値に変換
    const updateData = await request.json(); // リクエストボディ全体を取得
  
    // 必要な検証 (例: 空のオブジェクトは無効)
    if (!updateData || Object.keys(updateData).length === 0) {
      return new Response("Invalid data", { status: 400 });
    }
  
    // データベースを更新
    try {
      const response = await prisma.todo.update({
        where: {
          id: todoId,
        },
        data: updateData, // 動的にデータを更新
      });
  
      return Response.json(response);
    } catch (error) {
      console.error("Error updating todo:", error);
      return new Response("Error updating todo", { status: 500 });
    }
  }