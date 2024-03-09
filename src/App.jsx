import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import counterStore from '../store.js';
import {
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import GroupComponent from './components/Group.jsx';

const App = observer(() => {

  // Стейты для фильтров
  const [privacyFilter, setPrivacyFilter] = useState('all');
  const [avatarColorFilter, setAvatarColorFilter] = useState('any');
  const [friendsFilter, setFriendsFilter] = useState(false);

  // Цвета аватарок
  const availableColors = [
    'any', 'red', 'green', 'yellow', 'blue', 'purple', 'white', 'orange'
  ];

  // Загрузка групп
  useEffect(() => {
    counterStore.fetchGroups();
  }, []);

  // Фильтрация групп
  const filteredGroups = counterStore.groups.filter((group) => {
    if (privacyFilter === 'closed' && !group.closed) {
      return false;
    }
    if (privacyFilter === 'open' && group.closed) {
      return false;
    }
    if (avatarColorFilter !== 'any' && group.avatar_color !== avatarColorFilter) {
      return false;
    }
    if (friendsFilter && (!group.friends || group.friends.length === 0)) {
      return false;
    }
    return true;
  });

  // Обработчики изменения фильтров
  const handlePrivacyFilterChange = (value) => {
    setPrivacyFilter(value);
  };

  const handleAvatarColorFilterChange = (value) => {
    setAvatarColorFilter(value);
  };

  const handleFriendsFilterChange = (value) => {
    setFriendsFilter(value);
  };

  const [activePanel, setActivePanel] = useState('list');

  return (
    <>
      {counterStore.loading ? (
        // Если данные еще не загружены, будет отображено 'Загрузка...'
        <p className='pt-28 text-xl text-center'>Загрузка...</p>
      ) : (
        counterStore.groups.length >= 1 ?
          (
            // Отображение основного контента
            <View activePanel={activePanel} className="max-w-xl mx-auto">
              <Panel id="list">
                <PanelHeader>VK </PanelHeader>
                <Group header={<Header mode="secondary">Фильтры</Header>} className="space-y-8">
                  {/* Фильтр по типу группы */}
                  <div>
                    <SimpleCell className='mb-4'>
                      Тип группы
                    </SimpleCell>
                    {['all', 'closed', 'open'].map((type) => (
                      <SimpleCell
                        key={type}
                        onClick={() => handlePrivacyFilterChange(type)}
                        selected={privacyFilter === type}
                        style={{ backgroundColor: privacyFilter === type ? '#E5E5E5' : 'transparent' }}
                      >
                        {type === 'all' ? 'Все' : type === 'closed' ? 'Закрытая' : 'Открытая'}
                      </SimpleCell>
                    ))}
                  </div>

                  {/* Фильтр по цвету аватарки */}
                  <div>
                    <SimpleCell>
                      Цвет аватарки
                    </SimpleCell>
                    {availableColors.map((color) => (
                      <SimpleCell
                        key={color}
                        onClick={() => handleAvatarColorFilterChange(color)}
                        selected={avatarColorFilter === color}
                        style={{ backgroundColor: avatarColorFilter === color ? '#E5E5E5' : 'transparent' }}
                      >
                        {color === 'any' ? 'Любой цвет аватарки' : color}
                      </SimpleCell>
                    ))}
                  </div>

                  {/* Фильтр по наличию друзей в группе*/}
                  <div>
                    <SimpleCell className=''>
                      Наличие друзей
                    </SimpleCell>
                    {[false, true].map((value) => (
                      <SimpleCell
                        key={String(value)}
                        onClick={() => handleFriendsFilterChange(value)}
                        selected={friendsFilter === value}
                        style={{ backgroundColor: friendsFilter === value ? '#E5E5E5' : 'transparent' }}
                      >
                        {value ? 'Только с друзьями' : 'Все'}
                      </SimpleCell>
                    ))}
                  </div>
                </Group>

                {/* Отфильтрованные группы */}
                <Group header={<Header mode="secondary">Список сообществ</Header>}>
                  <ul className='px-4 pt-8'>
                    {filteredGroups.map((group) => (
                      <li key={group.id}>
                        <GroupComponent name={group.name} />
                      </li>
                    ))}
                  </ul>
                </Group>
              </Panel>
            </View>
          ) :
          <p className='pt-28 text-xl text-center'>Неизвестная ошибка. Попробуйте позже.</p>
      )}
    </>
  );
});

export default App;
