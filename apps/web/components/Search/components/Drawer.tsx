import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Search from "..";
import { toggleSearchDrawer } from "../../../reducers/search/actions";
import { IStore } from "../../../types/IStore";
import { isMobile, isTablet } from "react-device-detect";

const SearchDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: IStore) => state?.search);

  const toggle = () => dispatch(toggleSearchDrawer());

  return (
    <Drawer
      width={(isMobile && !isTablet) ? '100vw' : '535px'}
      open={!!open}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ display: "none" }}
      onClose={toggle}
      destroyOnClose
    >
      <Search />
    </Drawer>
  );
};

export default SearchDrawer;
