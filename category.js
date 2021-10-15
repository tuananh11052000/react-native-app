const CONTENT = [
    {
      expanded: false,
      category: "NHU YẾU PHẨM",
      subCategory: [
        { id: 1, name: 'Lương thực, thực phẩm', checked: false },
        { id: 2, name: 'Vật dụng cá nhân "dầu gội,..."', checked: false },
        { id: 3, name: 'Vật tư ý tế "khẩu trang,.."', checked: false },
        { id: 4, name: 'Mặt hàng khác' , checked: false},]
    },
    {
      expanded: false,
      category: "ĐỒ NGƯỜI LỚN",
      subCategory: [
        { id: 5, name: 'Quần áo, giày dép nam' , checked: false},
        { id: 6, name: 'Quần áo, giày dép nữ' , checked: false},
        { id: 7, name: 'Đồ trang điểm, tư trang' , checked: false},
        { id: 8, name: 'Đồ mẹ bầu', checked: false },
        { id: 9, name: 'Đồ người cao tuổi nam' , checked: false},
        { id: 10, name: 'Đồ người cao tuổi nữ', checked: false },
        { id: 11, name: 'Đồ khác' , checked: false},]
    },
    {
      expanded: false,
      category: "ĐỒ TRẺ EM",
      subCategory: [
        { id: 12, name: 'Đồ chơi' , checked: false},
        { id: 13, name: 'Xe đẩy, bàn ăn', checked: false },
        { id: 14, name: 'Tả, bỉm, sữa cho bé' , checked: false},
        { id: 15, name: 'Quần áo bé trai' , checked: false},
        { id: 16, name: 'Quần áo bé gái', checked: false },
        { id: 17, name: 'Đồ khác', checked: false },]
    },
    {
      expanded: false,
      category: "ĐỒ HỌC TẬP",
      subCategory: [
        { id: 18, name: 'Dụng cụ học tập', checked: false },
        { id: 19, name: 'Sách vở mẫu giáo' , checked: false},
        { id: 21, name: 'Sách vở lớp 1', checked: false },
        { id: 22, name: 'Sách vở lớp 2', checked: false },
        { id: 23, name: 'Sách vở lớp 3', checked: false },
        { id: 24, name: 'Sách vở lớp 4' , checked: false},
        { id: 25, name: 'Sách vở lớp 5', checked: false },
        { id: 26, name: 'Sách vở lớp 6', checked: false },
        { id: 27, name: 'Sách vở lớp 7', checked: false },
        { id: 28, name: 'Sách vở lớp 8', checked: false },
        { id: 29, name: 'Sách vở lớp 9', checked: false },
        { id: 30, name: 'Sách vở lớp 10', checked: false },
        { id: 31, name: 'Sách vở lớp 11', checked: false },
        { id: 32, name: 'Sách vở lớp 12', checked: false },
        { id: 33, name: 'Giáo trình ôn thi ĐH, CĐ', checked: false },
        { id: 34, name: 'Giáo trình các trường cao đẳng', checked: false },
        { id: 35, name: 'Giáo trình các trường đại học', checked: false },
        { id: 36, name: 'Truyện, báo, sách kỹ năng…', checked: false },
        { id: 37, name: 'Đồ học tập khác' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "ĐỒ SINH HOẠT GIA ĐÌNH",
      subCategory: [
        { id: 38, name: 'Đồ nội trợ nhà bếp', checked: false },
        { id: 39, name: 'Máy lạnh, máy giặt, quạt,...', checked: false },
        { id: 51, name: 'Nệm, Chăn, gối, màn,...', checked: false },
        { id: 40, name: 'Đồ khác' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "ĐỒ ĐIỆN TỬ",
      subCategory: [
        { id: 41, name: 'Tivi, loa, đài,...' , checked: false},
        { id: 42, name: 'Điện thoại, laptop, máy tính,...', checked: false },
        { id: 43, name: 'Đồ khác' , checked: false},
      ]
    },
    {
      expanded: false,
      category: "ĐỒ NỘI NGOẠI THẤT",
      subCategory: [
        { id: 44, name: 'Bàn ghế, giường, tủ, kệ,...', checked: false },
        { id: 45, name: 'Cây cảnh, bàn ghế đá,...', checked: false },
        { id: 46, name: 'Gạch, cát, xi măng, sắt,...', checked: false },
        { id: 47, name: 'Đồ khác' },
      ]
    },
    {
      expanded: false,
      category: "XE CỘ",
      subCategory: [
        { id: 48, name: 'Xe cho người khuyết tật' , checked: false},
        { id: 49, name: 'Xe đạp, xe điện, xe máy' , checked: false},
        { id: 50, name: 'Xe khác' },]
    },
    {
      expanded: false,
      category: 'PHẾ LIỆU "VE CHAI"',
      subCategory: [
        { id: 51, name: 'Nhựa, giấy, kim loại, "sắt, chì,..."', checked: false },
        { id: 52, name: 'Máy lạnh, tủ lạnh, máy giặt' , checked: false},
        { id: 53, name: 'Máy khoan, mài, máy bơm,...' , checked: false},
        { id: 54, name: 'Bếp điện, lò vi sóng, loa, ấm điện,...', checked: false },
        { id: 55, name: 'Điện thoại, tivi, loa, máy tính,...', checked: false },
        { id: 56, name: 'Xe máy, động cơ xăng dầu...' , checked: false},
        { id: 57, name: 'Thủy tinh "cửa kính, chai lọ...' , checked: false},
        { id: 58, name: 'Xăm, lốp xe, dầu nhớt thải...' , checked: false},
        { id: 59, name: 'Ve chai khác', checked: false },]
    },
  ];

  export default CONTENT;