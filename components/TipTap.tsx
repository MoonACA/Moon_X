'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TipTap = () => {
	const editor = useEditor({
		extensions: [StarterKit],
		editorProps: {
			attributes: {
				class: 'flex flex-col p-3 justify-start border border-white mt-[1rem]',
			},
		},
	})

	return (
		<div>
			<EditorContent editor={editor} />
		</div>
	)
}

export default TipTap
