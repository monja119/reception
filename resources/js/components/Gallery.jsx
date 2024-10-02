import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const defaultSize = {
    width : '250px',
    height : '250px'
}
export default function Gallery({
    dataImages,
    noTrash=false,
    hideTrash=true,
    onRemoveImage = (index) => {},
    downloadable = false,
    downloadableName = 'images'
}) {

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <>
            <div className="pswp-gallery gap-1 d-flex flex-row flex-wrap align-content-center " id={'gallery'}>
                {dataImages.map((image, index) => {
                    // get images size
                    let img = new Image();
                    img.src = image.data;
                    let width = img.width;
                    let height = img.height;
                    return(
                        <div
                            className={'d-flex flex-column justify-content-center align-items-center gallery-item'}
                            style={{
                                position: 'relative',
                                width: defaultSize.width,
                                height: defaultSize.height
                            }}
                             key={index}
                        >
                            <a
                                href={image.data}
                                data-pswp-width={width}
                                data-pswp-height={height}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className={'container-images m-1 rounded'}
                                    src={image.data}
                                    alt=""
                                />
                            </a>


                            {/* delete button */}
                            { !noTrash && <button
                                className={`btn btn-danger btn-sm trash ${!hideTrash && 'd-block'}`}
                                onClick={() => onRemoveImage(index)}
                            >
                                <span className={'fa fa-trash'}></span>
                            </button>
                            }
                        </div>
                    )}
                )}
            </div>
            {/* download   */}
            { downloadable &&
                <div className={'d-flex flex-row bg-white justify-content-center gap-2 pt-3 mt-5'}>
                    <button
                        className={'btn btn-primary btn-sm'}
                        onClick={() => {
                            let zip = new JSZip();
                            dataImages.forEach((image, index) => {
                                let filename = image.data.split('/').pop();
                                fetch(image.data)
                                    .then(res => res.blob())
                                    .then(blob => {
                                        zip.file(filename, blob, {binary: true});
                                    })
                                    .finally(() => {
                                        if(index === dataImages.length - 1){
                                            zip.generateAsync({type:"blob"})
                                                .then(function(content) {
                                                    saveAs(content, `${downloadableName}.zip`);
                                                });
                                        }
                                    });
                            });
                        }}
                    >
                        <span className={'text-center'}>Telecharger les images</span>
                    </button>
                </div>
            }
        </>
    );
}
