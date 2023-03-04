import { Tab, TabList, Tabs } from '@chakra-ui/react';

import { FC, useState } from 'react';
import { useAppContext } from '../../context/AppContext';

type Props = {
  isAddingList: boolean;
};

const Lists: FC<Props> = ({ isAddingList }) => {
  const {
    lists,
    // isLoading: isListLoading,
    setSelectedListId,
  } = useAppContext();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs onChange={(index) => setTabIndex(index)} variant="enclosed">
      <TabList>
        {lists.map(({ title, _id }) => {
          return (
            <Tab
              isDisabled={isAddingList}
              onClick={() => setSelectedListId(_id)}
              key={_id}
            >
              {title}
            </Tab>
          );
        })}
      </TabList>
    </Tabs>
  );
};

export default Lists;
