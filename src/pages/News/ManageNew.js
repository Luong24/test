import React, { Fragment, useEffect } from 'react'
import { NewStore } from '../../mobxStore/NewStore';
import { AiOutlineMore } from 'react-icons/ai';

export default function ManageNew() {
    const news = NewStore();

    useEffect(() => {
        news.getNew()
    }, [])

    // console.log('first', news.lstNew[0])

    const stringToHTML = (str) => {
        var dom = document.createElement("div");
        dom.innerHTML = str;
        return dom;
    };

    const renderNew = () => {
        return news.lstNew[0]?.map((item, index) => {
            return <div className='bg-white rounded-md p-6 m-2' style={{ width: '48%' }} key={index}>
                <div className='flex justify-between border-b pb-4'>
                    <h1 className='text-xl'>{item.subject}</h1>
                    <button className='w-8 h-8 flex justify-center items-center hover:border hover:rounded-full '><AiOutlineMore className='text-2xl' /></button>
                </div>
                <div>
                    <p>{stringToHTML(item.content).textContent}</p>
                    <br />
                </div>
                <div>
                    <h1>Tài liệu đính kèm:</h1>
                </div>
            </div>
        })
    }


    return (
        <div className='flex flex-wrap'>
            {renderNew()}
        </div>
    )
}
