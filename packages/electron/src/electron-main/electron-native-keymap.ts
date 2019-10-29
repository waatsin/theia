/********************************************************************************
 * Copyright (C) 2019 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

const nativeKeymap = require('native-keymap');

import { webContents } from 'electron';
import { injectable } from 'inversify';

import { ElectronApplicationContribution } from './electron-application';

@injectable()
export class ElectronNativeKeymap implements ElectronApplicationContribution {

    /**
     * Notify all renderer processes on keyboard layout change.
     */
    start(): void {
        nativeKeymap.onDidChangeKeyboardLayout(() => {
            const newLayout = {
                info: nativeKeymap.getCurrentKeyboardLayout(),
                mapping: nativeKeymap.getKeyMap()
            };
            for (const webContent of webContents.getAllWebContents()) {
                webContent.send('keyboardLayoutChanged', newLayout);
            }
        });
    }

}
