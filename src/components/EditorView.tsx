import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import { Paper, Box, IconButton } from "@mui/material";
import { FormatBold, FormatItalic, StrikethroughS, FormatUnderlined, FormatListBulleted } from "@mui/icons-material";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

const EditorView: FC = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
            }),
            BulletList.configure({
                keepMarks: true,
                keepAttributes: true,
            }),
            ListItem,
            Underline,
            Placeholder.configure({
                placeholder: "Write something …",
            }),
            CharacterCount.configure({}),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        content: `
        <ul>
          <li>A list item</li>
          <li>And another one</li>
        </ul>
      `,
    });

    if (!editor) {
        return null;
    }

    interface MenuButtonProps {
        action: string;
        isActive: boolean;
        children: React.ReactNode;
    }

    const MenuButton: FC<MenuButtonProps> = ({ action, isActive, children }) => (
        <IconButton
            onClick={() => {
                console.log(`${action}`);
                (editor.chain().focus() as any)[action]().run();
            }}
            color={isActive ? "primary" : "default"}
        >
            {children}
        </IconButton>
    );

    const menuButtons = [
        { action: "toggleBold", isActive: () => editor.isActive("bold"), icon: <FormatBold /> },
        { action: "toggleItalic", isActive: () => editor.isActive("italic"), icon: <FormatItalic /> },
        { action: "toggleStrike", isActive: () => editor.isActive("strike"), icon: <StrikethroughS /> },
        { action: "toggleUnderline", isActive: () => editor.isActive("underline"), icon: <FormatUnderlined /> },
        { action: "toggleBulletList", isActive: () => editor.isActive("bulletList"), icon: <FormatListBulleted /> },
    ];

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" gap={1} mb={2}>
                {menuButtons.map((button, index) => (
                    <MenuButton key={index} action={button.action} isActive={button.isActive()}>
                        {button.icon}
                    </MenuButton>
                ))}
            </Box>

            <Box sx={{ border: "1px solid #ddd", borderRadius: 1, minHeight: "60vh", p: 2 }}>
                <EditorContent editor={editor} />
            </Box>

            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <Box display="flex" gap={1} bgcolor="white" p={1} borderRadius={1} boxShadow={3}>
                        {menuButtons.map((button, index) => (
                            <MenuButton key={index} action={button.action} isActive={button.isActive()}>
                                {button.icon}
                            </MenuButton>
                        ))}
                    </Box>
                </BubbleMenu>
            )}
        </Paper>
    );
};

export default EditorView;
