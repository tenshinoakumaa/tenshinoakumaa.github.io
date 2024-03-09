import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import styled from "styled-components";
import Modal from 'react-modal';
import Avatar from "./Avatar";
import counterStore from '../../store.js';

const StyledDiv = styled.div`
    border-top: 1px solid #E0E0E0;
`;


const Group = observer(({ name }) => {

    {/* Стейт для управления модальным окном */}
    const [modalIsOpen, setModalIsOpen] = useState(false);

    {/*  Функция для открытия модального окна */}
    const openModal = () => {
        setModalIsOpen(true);
    };

    {/*  Функция для закрытия модального окна */}
    const closeModal = () => {
        setModalIsOpen(false);
    };

    {/*  Извлечение данных из стора */}
    const groups = counterStore.groups;


    {/* Находим нашу группу */}
    const group = groups.find(group => group.name === name);
    const friends = group.friends;

    return (
        <>

             {/* Информация о группе */}

            <StyledDiv className="flex flex-row items-center py-8">
                <Avatar color={group.avatar_color} />
                <div className="flex flex-col items-center text-center max-w-sm w-full space-y-4">
                    <span className="cursor-pointer">{group.name}</span>
                    <span>{group.closed ? 'Закрытое сообщество' : 'Открытое сообщество'}</span>
                    <span>
                        <span className="cursor-pointer" onClick={openModal}>
                            {group.friends ? (group.friends.length > 1 ? `${group.friends.length} друзей · ` : `1 друг · `) : ''}
                        </span>
                        {group.members_count} подписчиков
                    </span>
                </div>
            </StyledDiv>




            {/* Модальное окно для отображения друзей */}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
                content: {
                    width: '400px',
                    height: '70%',
                    margin: 'auto auto',
                    borderRadius: '20px',
                },
            }}>
                <div className="text-center text-2xl flex flex-col items-center space-y-8 p-1">
                    <span>Друзья</span>
                    <StyledDiv className="flex flex-col items-center space-y-8 pt-8">
                        {friends && friends.map((friend) => (
                            <span key={friend.first_name}>{friend.first_name} {friend.last_name}</span>
                        ))}
                    </StyledDiv>
                </div>
            </Modal>
        </>
    );
});

export default Group;
