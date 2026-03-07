import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useNotification, useAPIErrorHandler, Layouts } from '@strapi/admin/strapi-admin';
import { VisuallyHidden, SimpleMenu, MenuItem } from '@strapi/design-system';
import { ChevronDown, Files } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { useUploadFilesMutation } from '../services/api.mjs';
import { getTranslationKey } from '../utils/translations.mjs';

const MediaLibraryPage = ()=>{
    const { formatMessage } = useIntl();
    const { toggleNotification } = useNotification();
    const { _unstableFormatAPIError } = useAPIErrorHandler();
    const fileInputRef = React.useRef(null);
    const [uploadFiles] = useUploadFilesMutation();
    const handleFileSelect = ()=>{
        fileInputRef.current?.click();
    };
    const handleFileChange = async (e)=>{
        const files = e.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            const filesArray = Array.from(files);
            // Add files and fileInfo to the form data
            filesArray.forEach((file)=>{
                formData.append('files', file);
                formData.append('fileInfo', JSON.stringify({
                    name: file.name,
                    caption: null,
                    alternativeText: null,
                    folder: null
                }));
            });
            try {
                // unwrap() is needed to throw errors and trigger the catch block
                // Without it, RTK Query never rejects and catch would never execute
                await uploadFiles(formData).unwrap();
                toggleNotification({
                    type: 'success',
                    message: formatMessage({
                        id: getTranslationKey('assets.uploaded'),
                        defaultMessage: '{number, plural, one {# asset} other {# assets}} uploaded successfully'
                    }, {
                        number: filesArray.length
                    })
                });
            } catch (error) {
                // Format the error message using the API error handler to provide
                // context-specific feedback (e.g., file size limits, format restrictions, network errors)
                const errorMessage = _unstableFormatAPIError(error);
                toggleNotification({
                    type: 'danger',
                    message: errorMessage
                });
            }
        }
        // Reset input so the same file can be selected again
        e.target.value = '';
    };
    return /*#__PURE__*/ jsxs(Layouts.Root, {
        children: [
            /*#__PURE__*/ jsx(VisuallyHidden, {
                children: /*#__PURE__*/ jsx("input", {
                    type: "file",
                    ref: fileInputRef,
                    onChange: handleFileChange,
                    multiple: true
                })
            }),
            /*#__PURE__*/ jsx(Layouts.Header, {
                title: "TODO: Folder location",
                primaryAction: /*#__PURE__*/ jsx(SimpleMenu, {
                    popoverPlacement: "bottom-end",
                    variant: "default",
                    endIcon: /*#__PURE__*/ jsx(ChevronDown, {}),
                    label: formatMessage({
                        id: getTranslationKey('new'),
                        defaultMessage: 'New'
                    }),
                    children: /*#__PURE__*/ jsx(MenuItem, {
                        onSelect: handleFileSelect,
                        startIcon: /*#__PURE__*/ jsx(Files, {}),
                        children: formatMessage({
                            id: getTranslationKey('import-files'),
                            defaultMessage: 'Import files'
                        })
                    })
                })
            }),
            /*#__PURE__*/ jsx(Layouts.Content, {
                children: "TODO: List/Grid views"
            })
        ]
    });
};

export { MediaLibraryPage };
//# sourceMappingURL=MediaLibraryPage.mjs.map
