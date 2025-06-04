import { ChatResponse, Chatting, ReloadOutfit } from "@/src/services/chat";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  ReloadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Tag, Button, Image, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useState, useRef, useEffect, use } from "react";
import { GlitchReveal } from "../shared/GlitchTypo";
import CardCustom from "../shared/Card/cardCustom";
import { SelectedItems } from "@/src/app/wardrobe/page";
import ButtonDiscCustom from "@/src/components/shared/ButtonDIsc/discCustom";
import PlaceHolderImage from "../../assets/images/placeholder.png";
import Plus from "../../assets/icons/plus.png";

type MessageType = "user" | "bot";
type OutfitType = {
  _id: string;
  imageUrl?: string;
  link?: string;
  description?: string;
};

interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp: string;
  outfit?: OutfitType[];
  image?: string;
}

interface ChatProps {
  onOutfitSelect?: (outfit: string[]) => void;
  itemSelect?: SelectedItems;
  handleGenerateOutfit: () => void;
}

function Chat({ onOutfitSelect, itemSelect, handleGenerateOutfit }: ChatProps) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedItem, setSelectedItem] = useState<OutfitType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const suggestedTags = [
    "Trang phục hôm nay là gì?",
    "Trang phục phù hợp với thời tiết hôm nay?",
    "Trang phục hẹn hò?",
    "Trang phục dự tiệc",
  ];

  // Auto scroll to bottom when new message added
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial message
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        type: "bot",
        content:
          "Xin chào! Tôi là trợ lý thời trang của bạn. Hôm nay bạn muốn mặc gì?",
        timestamp: dayjs().format("HH:mm:ss"),
      },
    ];
    setMessages(initialMessages);
  }, []);

  // Handle outfit selection
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.type === "bot" &&
      lastMessage?.outfit &&
      lastMessage.outfit.length > 0 &&
      onOutfitSelect
    ) {
      onOutfitSelect(lastMessage.outfit.map((outfit) => outfit._id));
    }
  }, [messages]); // Remove onOutfitSelect from dependencies since it's stable

  // Handle send message
  const handleSendMessage = async () => {
    if (!value.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: value,
      timestamp: dayjs().format("HH:mm:ss"),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const botResponses: ChatResponse = await Chatting({ question: value });
      const outfitItems =
        botResponses.outfit?.map((id) => {
          let imageUrl = PlaceHolderImage.src;
          let description = "";
          let link = "";
          if (itemSelect?.upper?.id === id) {
            imageUrl = itemSelect.upper.imageSrc;
            description = itemSelect.upper.description || "";
            link = itemSelect.upper.link || "";
          } else if (itemSelect?.downer?.id === id) {
            imageUrl = itemSelect.downer.imageSrc;
            description = itemSelect.downer.description || "";
            link = itemSelect.downer.link || "";
          } else if (itemSelect?.shoes?.id === id) {
            imageUrl = itemSelect.shoes.imageSrc;
            description = itemSelect.shoes.description || "";
            link = itemSelect.shoes.link || "";
          }
          return {
            _id: id,
            imageUrl,
            description,
            link,
          };
        }) || [];

      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content:
          botResponses.reply ||
          "Tôi không hiểu câu hỏi của bạn. Vui lòng thử lại.",
        timestamp: dayjs().format("HH:mm:ss"),
        outfit: outfitItems,
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
      setValue("");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bot response:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: "Đã xảy ra lỗi khi lấy phản hồi từ bot. Vui lòng thử lại.",
        timestamp: dayjs().format("HH:mm:ss"),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }
  };

  const handleTagClick = (tagText: any) => {
    setValue(tagText);
  };

  // Handle Enter key press
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReload = async (item: OutfitType) => {
    setLoadingItems((prev) => ({ ...prev, [item._id]: true }));
    try {
      const itemIds = messages[messages.length - 1].outfit?.map(
        (outfit) => outfit._id
      );
      const response = await ReloadOutfit(item._id, itemIds || []);
      const newOutFitItem: OutfitType = {
        _id: response._id,
        imageUrl: response.image,
        link: response.link,
        description: response.description,
      };
      console.log(newOutFitItem);
      // Update the outfit in the messages
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.type === "bot" && message.outfit) {
            return {
              ...message,
              outfit: message.outfit.map((outfitItem) =>
                outfitItem._id === item._id ? newOutFitItem : outfitItem
              ),
            };
          }
          return message;
        })
      );

      // Update the selected outfit if onOutfitSelect is provided
      if (onOutfitSelect) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.outfit) {
          const updatedOutfit = lastMessage.outfit.map((outfitItem) =>
            outfitItem._id === item._id ? newOutFitItem : outfitItem
          );
          onOutfitSelect(updatedOutfit.map((outfit) => outfit._id));
        }
      }
      message.success("Trang phục đã được tạo lại");
    } catch (error) {
      console.error("Error reloading outfit:", error);
      message.error("Failed to reload outfit");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [item._id]: false }));
    }
  };

  const handleItemClick = (item: OutfitType) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalVisible(false);
  };

  return (
    <div className="wardrobe_chat__content w-full shadow-xl shadow-slate-300">
      {/* Item Detail Modal */}
      <Modal
        title="Chi tiết trang phục"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
          selectedItem?.link && (
            <Button
              key="link"
              type="primary"
              icon={<LinkOutlined />}
              onClick={() => window.open(selectedItem.link, "_blank")}
            >
              Xem sản phẩm
            </Button>
          ),
        ]}
        width={600}
      >
        {selectedItem && (
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-center">
              <Image
                src={selectedItem.imageUrl || PlaceHolderImage.src}
                alt="Item detail"
                className="max-h-[400px] object-contain"
              />
            </div>
            {selectedItem.description && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Mô tả:</h3>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      <div className="w-[100%] h-[90vh] flex flex-col items-center bg-hero-pattern rounded-lg p-4">
        {/* Nội dung chat (scroll được) */}
        <div className="flex flex-col items-center rounded-lg w-[100%] h-full rounded-xl">
          {/* Chat messages */}
          <div
            ref={chatContentRef}
            className="flex-1 overflow-y-auto chat-content w-full flex flex-col px-4 py-2 mb-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-md shadow-md"
                  }`}
                >
                  <div className="text-base leading-relaxed whitespace-pre-line">
                    {message.content}
                  </div>
                  {message.outfit && message.outfit.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-semibold">
                        Gợi ý trang phục:
                      </span>
                      <div className="flex flex-wrap gap-20 justify-center mt-5">
                        {message.outfit.map((item, index) => (
                          <div key={index} className="message-outfit relative">
                            <CardCustom
                              cardSrc={
                                item._id === itemSelect?.upper?.id
                                  ? itemSelect?.upper?.imageSrc ||
                                    PlaceHolderImage.src
                                  : item._id === itemSelect?.downer?.id
                                  ? itemSelect?.downer?.imageSrc ||
                                    PlaceHolderImage.src
                                  : item._id === itemSelect?.shoes?.id
                                  ? itemSelect?.shoes?.imageSrc ||
                                    PlaceHolderImage.src
                                  : item.imageUrl || PlaceHolderImage.src
                              }
                              cardAlt={item._id}
                              cardWidth={100}
                              cardHeight={100}
                              className={`!w-[179px] !h-[179px] cursor-pointer transition-all hover:scale-105`}
                              onClick={() => handleItemClick(item)}
                            />
                            <Button
                              onClick={() => handleReload(item)}
                              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                            >
                              {loadingItems[item._id] ? (
                                <LoadingOutlined className="text-xl text-blue-500" />
                              ) : (
                                <ReloadOutlined className="text-xl text-gray-600 hover:text-blue-500" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-4">
                        <ButtonDiscCustom
                          onClick={handleGenerateOutfit}
                          className="shadow-lg shadow-black/25"
                        >
                          <Image
                            src={Plus.src}
                            alt="plus"
                            width={24}
                            height={24}
                            className="mr-2"
                          />{" "}
                          Tạo Trang Phục
                        </ButtonDiscCustom>
                      </div>
                    </div>
                  )}
                  <div
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input area */}
          <div className="flex flex-col chat-conversation w-full min-h-[200px] p-4 bg-white/85 backdrop-blur-md shadow-xl shadow-blue-500/25 rounded-3xl">
            <div className="recommend-tag mb-3">
              {suggestedTags.map((tag, index) => (
                <Tag
                  key={index}
                  className="!text-sm !text-gray-600 !bg-gray-100 !px-3 !py-1 !font-medium !cursor-pointer !mb-2 !mr-2 hover:!bg-blue-50 hover:!text-blue-600 transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </div>
            {loading && (
              <div className="loading flex p-4">
                <GlitchReveal
                  text="Đang xử lí yêu cầu "
                  infinite={true}
                  loopDelay={1500}
                  speed={100}
                />
                <LoadingOutlined className="!text-sky-600" />
              </div>
            )}
            <div className="flex flex-1 gap-2 items-end relative">
              <TextArea
                disabled={loading}
                className={`
                  !flex-1 !h-[130px] !rounded-2xl !bg-white !text-black
                  !shadow-md !shadow-blue-500/25 !text-base !border-gray-200 p-5
                  ${
                    loading
                      ? "!opacity-50 !cursor-not-allowed !bg-gray-100"
                      : ""
                  }
                `}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hãy tìm kiếm trang phục của bạn tại đây..."
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
              <Button
                type="primary"
                size="large"
                className="!h-[30px] !w-[30px] absolute !rounded-[100%] !bg-blue-500 hover:!bg-blue-600 !border-none !shadow-md right-2 bottom-2"
                onClick={handleSendMessage}
                disabled={!value.trim()}
              >
                <ArrowRightOutlined className="!text-white !text-lg" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
