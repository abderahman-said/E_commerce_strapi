'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var designSystem = require('@strapi/design-system');
var icons = require('@strapi/icons');
var reactIntl = require('react-intl');
var api = require('../services/api.js');
var translations = require('../utils/translations.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const MediaLibraryPage = ()=>{
    const { formatMessage } = reactIntl.useIntl();
    const { toggleNotification } = strapiAdmin.useNotification();
    const { _unstableFormatAPIError } = strapiAdmin.useAPIErrorHandler();
    const fileInputRef = React__namespace.useRef(null);
    const [uploadFiles] = api.useUploadFilesMutation();
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
                        id: translations.getTranslationKey('assets.uploaded'),
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
    return /*#__PURE__*/ jsxRuntime.jsxs(strapiAdmin.Layouts.Root, {
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.VisuallyHidden, {
                children: /*#__PURE__*/ jsxRuntime.jsx("input", {
                    type: "file",
                    ref: fileInputRef,
                    onChange: handleFileChange,
                    multiple: true
                })
            }),
            /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.Layouts.Header, {
                title: "TODO: Folder location",
                primaryAction: /*#__PURE__*/ jsxRuntime.jsx(designSystem.SimpleMenu, {
                    popoverPlacement: "bottom-end",
                    variant: "default",
                    endIcon: /*#__PURE__*/ jsxRuntime.jsx(icons.ChevronDown, {}),
                    label: formatMessage({
                        id: translations.getTranslationKey('new'),
                        defaultMessage: 'New'
                    }),
                    children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.MenuItem, {
                        onSelect: handleFileSelect,
                        startIcon: /*#__PURE__*/ jsxRuntime.jsx(icons.Files, {}),
                        children: formatMessage({
                            id: translations.getTranslationKey('import-files'),
                            defaultMessage: 'Import files'
                        })
                    })
                })
            }),
            /*#__PURE__*/ jsxRuntime.jsx(strapiAdmin.Layouts.Content, {
                children: "TODO: List/Grid views"
            })
        ]
    });
};

exports.MediaLibraryPage = MediaLibraryPage;
//# sourceMappingURL=MediaLibraryPage.js.map
