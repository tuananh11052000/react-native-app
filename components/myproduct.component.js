import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import config from "../config";
import {
  MenuProvider,
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";

async function getToken() {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return await result;
  } else {
    return await "Null";
  }
}

export function MyProductComponent(props) {
  const [loading, setloading] = useState(true);
  const [dataRender, setData] = useState([]);
  const [token, setToken] = useState("Null"); //token
  const [reload, setReload] = useState(false)
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  useEffect(() => {
    getToken();
    getMyPost();
    return () => { };
  }, [reload]);
  const getMyPost = async () => {
    if (reload == true) {
      setReload(false)
    }
    let result = await SecureStore.getItemAsync("token");
    await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/post/getPostByAccountId",
      headers: {
        Authorization: result,
      },
    })
      .then((data) => {
        setloading(false);
        setData(data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    };
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    };
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    };
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    };
    if (calYear() != 0) return `${calYear()}y `;
    else if (calMonth() != 0) return `${calMonth()}mth `;
    else if (calDay() != 0) return `${calDay()}d `;
    else if (calHour() != 0) return `${calHour()}h `;
    else return `${calMinute()}m `;
  };

  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 20) return item.slice(0, 20) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
  };
  // render District
  const renderDistrict = (district, city) => {
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber = "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12"
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) != -1) {
    return district;
  }
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) == -1) {
    return district.slice(5);
  }
    if (district.indexOf("Huyện") != -1) {
      return district.slice(7);
    }
  };
  // render address
  const renderAddress = (address) => {
    let add = address.split(",");
    let huyen = "",
      tinh = "";
    if (add[3].indexOf("Thành phố") != -1) {
      tinh = add[3].slice(10);
    } else {
      tinh = add[3].slice(6);
    }
    huyen = renderDistrict(add[2], add[3]);

    let diachi = huyen + ", " + tinh;
    return diachi;
  };
  const renderAuthor = (item) => {
    if (item == "tangcongdong") return "Tặng cộng đồng";
    else return "Cần hỗ trợ";
  };

  const renderConfirm = (item) => {
    if (item)
      return (
        <View style={style.wrapBot}>
          <Feather
            name="eye"
            size={18}
            color="#00a2e8"
            style={{ width: 18, height: 18 }}
          />
          <Text style={style.textStatusTrue}>&ensp;Hiển thị</Text>
        </View>
      );
    else return <Text style={style.textStatusFalse}>Chờ xác thực</Text>;
  };

  //sang trang detail
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const currentTime = new Date();

  //Ham xoa bai dang
  const deletePost = (id) => {
    let url =
      "https://smai-app-api.herokuapp.com/post/deletePostbyUser?_id=" + id;
    console.log(url);
    axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      if (res.status == 201) {
        // alert("Xoá bài thành công.");
        Alert.alert("Thông báo", "Xóa bài thành công", [{ text: "OK" }]);
        setReload(true)
      }
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={style.wrapCategory}
      activeOpacity={0.4}
      onPress={() => _pressRow(item)}
    >
      {/* //dùng onStartShouldSetResponder để click vào view */}

      <View style={style.wrapTop}>
        <Image
          style={style.tinyLogo}
          source={{
            uri: item.urlImage[0],
          }}
        />
        <View style={style.wrapInfoProduct}>
          <MenuProvider style={{}}>
            <View style={style.wrapTitle}>
              <Text style={style.titlePost}>{renderTitle(item.title)}</Text>
              <View style={style.wrapMore}>
                {/* <MenuContext style={{}}> */}
                <View style={{ alignItems: "flex-end" }}>
                  <Menu>
                    <MenuTrigger>
                      <Feather name="more-vertical" size={20} color="gray" />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles} onSelect={false}>
                      <MenuOption
                        value="Delete"
                        text="Xóa tin"
                        onSelect={() => deletePost(item._id)}
                      />
                    </MenuOptions>
                  </Menu>
                </View>
                {/* </MenuContext> */}
              </View>
            </View>

            <View style={style.wrapTypePrice}>
              <Text style={style.type}>{renderType(item.NameProduct)}</Text>
              <Text style={style.price}>Miễn phí</Text>
            </View>
            <View style={style.wrapTimeAddress}>
              <View style={style.wrapTime}>
                <Feather
                  name="clock"
                  size={18}
                  color="gray"
                  style={{ width: 18, height: 18 }}
                />
                <Text style={style.time}>
                  {calculatingTime(item.createdAt, currentTime)}
                </Text>
              </View>
              <Text style={style.address}>{renderAddress(item.address)}</Text>
            </View>
          </MenuProvider>
        </View>
      </View>
      <View style={style.wrapBot}>
        <Text style={style.textCate}>{renderAuthor(item.TypeAuthor)}</Text>
        <Text style={style.textStatus}>{renderConfirm(item.confirm)}</Text>
      </View>
    </TouchableOpacity>
  );
  // space between item flatlist
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  return (
    <View style={style.container}>
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator color="#BDBDBD" size="small" />
        </View>
      ) : (
        <FlatList
          data={dataRender}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

export function DonateProductComponent(props) {
  const [loading, setloading] = useState(true);
  const [dataRender, setData] = useState([]);
  const [token, setToken] = useState("Null"); //token
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  useEffect(() => {
    getMyPost();
    return () => { };
  }, []);
  const getMyPost = async () => {
    let result = await SecureStore.getItemAsync("token");
    await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/post/getPostByAccountId",
      headers: {
        Authorization: result,
      },
    })
      .then((data) => {
        var donate = data.data.filter(
          (element) => element.TypeAuthor == "tangcongdong"
        );
        setloading(false);
        setData(donate);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    };
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    };
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    };
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    };
    if (calYear() != 0) return `${calYear()}y `;
    else if (calMonth() != 0) return `${calMonth()}mth `;
    else if (calDay() != 0) return `${calDay()}d `;
    else if (calHour() != 0) return `${calHour()}h `;
    else return `${calMinute()}m `;
  };

  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 20) return item.slice(0, 20) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
  };
  // render address
  const renderDistrict = (district, city) => {
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber = "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12"
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) != -1) {
    return district;
  }
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) == -1) {
    return district.slice(5);
  }
    if (district.indexOf("Huyện") != -1) {
      return district.slice(7);
    }
  };
  // render địa chỉ
  const renderAddress = (address) => {
    let add = address.split(",");
    let huyen = "",
      tinh = "";
    if (add[3].indexOf("Thành phố") != -1) {
      tinh = add[3].slice(10);
    } else {
      tinh = add[3].slice(6);
    }
    huyen = renderDistrict(add[2], add[3]);

    let diachi = huyen + ", " + tinh;
    return diachi;
  };
  const renderAuthor = (item) => {
    if (item == "tangcongdong") return "Tặng cộng đồng";
    else return "Cần hỗ trợ";
  };

  const renderConfirm = (item) => {
    if (item)
      return (
        <View style={style.wrapBot}>
          <Feather
            name="eye"
            size={18}
            color="#00a2e8"
            style={{ width: 18, height: 18 }}
          />
          <Text style={style.textStatusTrue}>&ensp;Hiển thị</Text>
        </View>
      );
    else return <Text style={style.textStatusFalse}>Chờ xác thực</Text>;
  };

  //sang trang detail
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const currentTime = new Date();

  //Ham xoa bai dang
  const deletePost = (id) => {
    let url =
      "https://smai-app-api.herokuapp.com/post/deletePostbyUser?_id=" + id;
    console.log(url);
    axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      if (res.status == 201) {
        // alert("Xoá bài thành công.");
        Alert.alert("Thông báo", "Xóa bài thành công", [{ text: "OK" }]);
      }
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={style.wrapCategory}
      activeOpacity={0.4}
      onPress={() => _pressRow(item)}
    >
      {/* //dùng onStartShouldSetResponder để click vào view */}

      <View style={style.wrapTop}>
        <Image
          style={style.tinyLogo}
          source={{
            uri: item.urlImage[0],
          }}
        />
        <View style={style.wrapInfoProduct}>
          <MenuProvider style={{}}>
            <View style={style.wrapTitle}>
              <Text style={style.titlePost}>{renderTitle(item.title)}</Text>
              <View style={style.wrapMore}>
                {/* <MenuContext style={{}}> */}
                <View style={{ alignItems: "flex-end" }}>
                  <Menu>
                    <MenuTrigger>
                      <Feather name="more-vertical" size={20} color="gray" />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles} onSelect={false}>
                      <MenuOption
                        value="Delete"
                        text="Xóa tin"
                        onSelect={() => deletePost(item._id)}
                      />
                    </MenuOptions>
                  </Menu>
                </View>
                {/* </MenuContext> */}
              </View>
            </View>

            <View style={style.wrapTypePrice}>
              <Text style={style.type}>{renderType(item.NameProduct)}</Text>
              <Text style={style.price}>Miễn phí</Text>
            </View>
            <View style={style.wrapTimeAddress}>
              <View style={style.wrapTime}>
                <Feather
                  name="clock"
                  size={18}
                  color="gray"
                  style={{ width: 18, height: 18 }}
                />
                <Text style={style.time}>
                  {calculatingTime(item.createdAt, currentTime)}
                </Text>
              </View>
              <Text style={style.address}>{renderAddress(item.address)}</Text>
            </View>
          </MenuProvider>
        </View>
      </View>
      <View style={style.wrapBot}>
        <Text style={style.textCate}>{renderAuthor(item.TypeAuthor)}</Text>
        <Text style={style.textStatus}>{renderConfirm(item.confirm)}</Text>
      </View>
    </TouchableOpacity>
  );
  // space between item flatlist
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  return (
    <View style={style.container}>
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator color="#BDBDBD" size="small" />
        </View>
      ) : (
        <FlatList
          data={dataRender}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

export function HelpProductComponent(props) {
  const [loading, setloading] = useState(true);
  const [dataRender, setData] = useState([]);
  const [token, setToken] = useState("Null"); //token
  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
  });
  useEffect(() => {
    getMyPost();
    return () => { };
  }, []);
  const getMyPost = async () => {
    let result = await SecureStore.getItemAsync("token");
    await axios({
      method: "get",
      url: "https://smai-app-api.herokuapp.com/post/getPostByAccountId",
      headers: {
        Authorization: result,
      },
    })
      .then((data) => {
        var help = data.data.filter(
          (element) => element.TypeAuthor !== "tangcongdong"
        );
        setloading(false);
        setData(help);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const calculatingTime = (d1, d2) => {
    d1 = new Date(d1);
    const calMinute = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 1000));
    };
    const calHour = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (60 * 60 * 1000));
    };
    const calDay = () => {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return parseInt((t2 - t1) / (24 * 60 * 60 * 1000));
    };
    const calMonth = () => {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    };
    const calYear = () => {
      return d2.getFullYear() - d1.getFullYear();
    };
    if (calYear() != 0) return `${calYear()}y `;
    else if (calMonth() != 0) return `${calMonth()}mth `;
    else if (calDay() != 0) return `${calDay()}d `;
    else if (calHour() != 0) return `${calHour()}h `;
    else return `${calMinute()}m `;
  };

  //Function handling title post
  const renderTitle = (item) => {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    if (item.length > 20) return item.slice(0, 20) + "...";
    else return item;
  };
  //Function handling type product
  const renderType = (pr) => {
    if (pr.length > 1) return pr[0].Category + ", ...";
    else return pr[0].Category;
  };
  // render address
  const renderDistrict = (district, city) => {
    if (district.indexOf("Thành phố") != -1) {
      return district.slice(10);
    }
    if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") == -1) {
      return district.slice(5);
    }
    const distritNumber = "Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 6, Quận 7, Quận 8, Quận 9, Quận 10, Quận 11, Quận 12"
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) != -1) {
    return district;
  }
  if (district.indexOf("Quận") != -1 && city.indexOf("Hồ Chí Minh") != -1 && distritNumber.indexOf(district) == -1) {
    return district.slice(5);
  }
    if (district.indexOf("Huyện") != -1) {
      return district.slice(7);
    }
  };
  // render địa chỉ
  const renderAddress = (address) => {
    let add = address.split(",");
    let huyen = "",
      tinh = "";
    if (add[3].indexOf("Thành phố") != -1) {
      tinh = add[3].slice(10);
    } else {
      tinh = add[3].slice(6);
    }
    huyen = renderDistrict(add[2], add[3]);

    let diachi = huyen + ", " + tinh;
    return diachi;
  };
  const renderAuthor = (item) => {
    if (item == "tangcongdong") return "Tặng cộng đồng";
    else return "Cần hỗ trợ";
  };

  const renderConfirm = (item) => {
    if (item)
      return (
        <View style={style.wrapBot}>
          <Feather
            name="eye"
            size={18}
            color="#00a2e8"
            style={{ width: 18, height: 18 }}
          />
          <Text style={style.textStatusTrue}>&ensp;Hiển thị</Text>
        </View>
      );
    else return <Text style={style.textStatusFalse}>Chờ xác thực</Text>;
  };

  //sang trang detail
  const _pressRow = (item) => {
    props.navigation.navigate("DetailPost", { data: item }); //chuyển trang
  };

  const currentTime = new Date();

  //Ham xoa bai dang
  const deletePost = (id) => {
    let url =
      "https://smai-app-api.herokuapp.com/post/deletePostbyUser?_id=" + id;
    console.log(url);
    axios({
      method: "delete",
      url: url,
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      if (res.status == 201) {
        // alert("Xoá bài thành công.");
        Alert.alert("Thông báo", "Xóa bài thành công", [{ text: "OK" }]);
      }
    });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={style.wrapCategory}
      activeOpacity={0.4}
      onPress={() => _pressRow(item)}
    >
      {/* //dùng onStartShouldSetResponder để click vào view */}

      <View style={style.wrapTop}>
        <Image
          style={style.tinyLogo}
          source={{
            uri: item.urlImage[0],
          }}
        />
        <View style={style.wrapInfoProduct}>
          <MenuProvider style={{}}>
            <View style={style.wrapTitle}>
              <Text style={style.titlePost}>{renderTitle(item.title)}</Text>
              <View style={style.wrapMore}>
                {/* <MenuContext style={{}}> */}
                <View style={{ alignItems: "flex-end" }}>
                  <Menu>
                    <MenuTrigger>
                      <Feather name="more-vertical" size={20} color="gray" />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles} onSelect={false}>
                      <MenuOption
                        value="Delete"
                        text="Xóa tin"
                        onSelect={() => deletePost(item._id)}
                      />
                    </MenuOptions>
                  </Menu>
                </View>
                {/* </MenuContext> */}
              </View>
            </View>

            <View style={style.wrapTypePrice}>
              <Text style={style.type}>{renderType(item.NameProduct)}</Text>
              <Text style={style.price}>Miễn phí</Text>
            </View>
            <View style={style.wrapTimeAddress}>
              <View style={style.wrapTime}>
                <Feather
                  name="clock"
                  size={18}
                  color="gray"
                  style={{ width: 18, height: 18 }}
                />
                <Text style={style.time}>
                  {calculatingTime(item.createdAt, currentTime)}
                </Text>
              </View>
              <Text style={style.address}>{renderAddress(item.address)}</Text>
            </View>
          </MenuProvider>
        </View>
      </View>
      <View style={style.wrapBot}>
        <Text style={style.textCate}>{renderAuthor(item.TypeAuthor)}</Text>
        <Text style={style.textStatus}>{renderConfirm(item.confirm)}</Text>
      </View>
    </TouchableOpacity>
  );
  // space between item flatlist
  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 10, width: "100%", backgroundColor: "#EEEEEE" }} />
    );
  };
  return (
    <View style={style.container}>
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator color="#BDBDBD" size="small" />
        </View>
      ) : (
        <FlatList
          data={dataRender}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: "20%",
  },
  containterLoading: {
    flex: 1,
    justifyContent: "center",
  },

  // style product
  wrapCategory: {
    padding: 15,
    paddingBottom: 10,
    // marginBottom: 10,
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  wrapTop: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: 5,
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
  wrapTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapMore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  wrapInfoProduct: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  wrapTypePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  wrapTimeAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlePost: {
    fontSize: config.fontsize_2,
    fontFamily: "OpenSans_600SemiBold",
  },
  wrapTime: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  time: {
    fontSize: config.fontsize_3,
    marginLeft: 5,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  price: {
    color: "green",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  type: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  address: {
    color: "black",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
  },
  wrapBot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  textCate: {
    fontSize: config.fontsize_3,
    color: "gray",
    fontFamily: "OpenSans_400Regular",
  },
  textStatusTrue: {
    fontSize: config.fontsize_3,
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
  textStatusFalse: {
    fontSize: config.fontsize_3,
    color: "red",
    fontFamily: "OpenSans_400Regular",
  },
  textFalse: {
    color: "gray",
    fontSize: config.fontsize_3,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#f2f2f2",
    width: "70%",
    borderRadius: 5,
  },
  optionsWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  optionWrapper: {
    backgroundColor: "white",
    marginBottom: 2,
    borderRadius: 5,
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  optionText: {
    color: "black",
    fontSize: 16,
    padding: 6,
    fontFamily: "OpenSans_400Regular",
  },
};
