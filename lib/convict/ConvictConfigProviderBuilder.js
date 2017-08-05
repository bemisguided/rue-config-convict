/**
 * Rue - nodejs dependency injection container
 *
 * Copyright 2017 Martin Crawford (@bemisguided)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @flow
 */
import { Container } from 'rue';
import { ConfigProvider, ConfigProviderBuilder } from 'rue-config';
import convict from 'convict';
import ConvictConfigProvider from './ConvictConfigProvider';

export default class ConvictConfigProviderBuilder extends ConfigProviderBuilder {

  static configure(schema: Object, container: Container): ConvictConfigProviderBuilder {
    let convictConfig = convict(schema);
    // eslint-disable-next-line no-unused-vars
    let configProviderFactoryFunction = (...dependencies: any) => {
      return new Promise((resolve) => {
        resolve(new ConvictConfigProvider(convictConfig));
      });
    };
    return new ConvictConfigProviderBuilder(convictConfig, configProviderFactoryFunction, container);
  }

  convictConfig : any;

  constructor<P: ConfigProvider>(convictConfig: any, configProviderFactoryFunction: (...dependencies: any) => Promise<P>, container: Container) {
    super(configProviderFactoryFunction, container);
    this.convictConfig = convictConfig;
  }

  withFiles(...fileNames: Array<string>) {
    this.convictConfig.loadFile(...fileNames);
  }
  
}
