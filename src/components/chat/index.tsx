import { ChatResponse, Chatting } from "@/src/services/chat";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Tag, Button, Image } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useState, useRef, useEffect, use } from "react";
import { GlitchReveal } from "../shared/GlitchTypo";
import CardCustom from "../shared/Card/cardCustom";
import { SelectedItems } from "@/src/app/wardrobe/page";
import ButtonDiscCustom from "../shared/ButtonDIsc/discCustom";
import PlaceHolderImage from "@/src/assets/images/placeholder.png";
import Plus from "@/src/assets/icons/plus.png";

type MessageType = "user" | "bot";

interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp: string;
  outfit?: string[];
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
  const [generatedOutfit, setGeneratedOutfit] = useState<string[]>([]);
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
      onOutfitSelect(lastMessage.outfit);
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
      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content:
          botResponses.reply ||
          "Tôi không hiểu câu hỏi của bạn. Vui lòng thử lại.",
        timestamp: dayjs().format("HH:mm:ss"),
        outfit: botResponses.outfit || undefined,
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

  return (
    <div className="wardrobe_chat__content w-full shadow-xl shadow-slate-300">
      <div className="w-[100%] h-[90vh] flex flex-col items-center bg-hero-pattern rounded-lg p-4">
        {/* Nội dung chat (scroll được) */}
        <div className="flex flex-col items-center rounded-lg w-[50%] h-full rounded-xl">
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
                      <div className="flex flex-wrap gap-2 mt-1">
                        {message.outfit.map((item, index) => (
                          <CardCustom
                            key={index}
                            cardSrc={
                              item === itemSelect?.upper?.id
                                ? itemSelect?.upper?.imageSrc || ""
                                : item === itemSelect?.downer?.id
                                ? itemSelect?.downer?.imageSrc || ""
                                : item === itemSelect?.shoes?.id
                                ? itemSelect?.shoes?.imageSrc || ""
                                : PlaceHolderImage.src
                            }
                            cardAlt={item}
                            cardWidth={100}
                            cardHeight={100}
                            className={`!w-[179px] !h-[179px] cursor-pointer transition-all `}
                          />
                        ))}
                      </div>
                      <div className="btn-generate-outfit my-5">
                        <ButtonDiscCustom
                          onClick={handleGenerateOutfit}
                          className="shadow-lg shadow-black/25"
                        >
                          <Image
                            src={Plus.src}
                            alt="plus"
                            width={24}
                            height={24}
                            className="mr-2 "
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
            <div className="flex flex-1 gap-2 items-end relative ">
              <TextArea
                disabled={loading}
                className={`
    !flex-1 !h-[130px] !rounded-2xl !bg-white !text-black
    !shadow-md !shadow-blue-500/25 !text-base !border-gray-200 p-5
    ${loading ? "!opacity-50 !cursor-not-allowed !bg-gray-100 " : ""}
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
                className="!h-[30px] !w-[30px] absolute  !rounded-[100%] !bg-blue-500 hover:!bg-blue-600 !border-none !shadow-md right-2 bottom-2"
                onClick={handleSendMessage}
                disabled={!value.trim()}
              >
                <ArrowRightOutlined className="!text-white !text-lg " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
